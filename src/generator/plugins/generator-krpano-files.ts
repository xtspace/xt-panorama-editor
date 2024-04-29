import { downloadUrl } from "@/utils/request"
import axios from "axios"

export default function pluginFactory() {

    function plugin(path: string) {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: downloadUrl,
                method: "get",
                url: path,
            }).then((res) => {
                resolve({
                    name: path,
                    ext: "",
                    content: res.data
                })
            }).catch(err => reject(err))
        })
    }

    return plugin

}