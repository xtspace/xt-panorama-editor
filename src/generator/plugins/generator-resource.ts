import axios from "axios"
import { ResultFile } from "@/types/generator/file"
import { downloadUrl } from "@/utils/request"
import JSZip from 'jszip';

export default function pluginFactory() {
    function plugin(url: string): Promise<ResultFile | ResultFile[]> {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: downloadUrl,
                    method: "get",
                    url,
                    responseType: "blob",
                }).then((res) => {
                    if (url.includes('/api/file/download/zip?panoId=')) {
                        const zip = new JSZip();
                        zip.loadAsync(res.data).then(content => {
                            const promises: Promise<void>[] = [];
                            //遍历zip里面包含的文件
                            const resultArr: ResultFile[] = []
                            content.forEach((relativePath, zipEntry) => {
                                promises.push(
                                    zipEntry.async("blob").then(contentBlob => {
                                        resultArr.push({
                                            name: relativePath,
                                            ext: relativePath.match(/\.([^.]+)$/)?.[1] ? "" : "jpg",
                                            content:contentBlob
                                        })
                                    })
                                )
                            });
                            Promise.all(promises).then(() => {
                                resolve(resultArr)
                            })
                        }).catch((err) => {
                            reject(err)
                        })
                    } else {
                        const file = new Blob([res.data], {type: "application/octet-stream"})
                        resolve({
                            name: url,
                            ext: url.match(/\.([^.]+)$/)?.[1] ? "" : "jpg",
                            content:file
                        })
                    }
                }).catch((err) => {
                    reject(err)
                })
        })
    }
    return plugin
}
