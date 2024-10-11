import { downloadUrl } from "@/utils/request"
import axios from "axios"

type Params = Record<"url" | "ext" | "name", string>
export default function pluginFactory() {

    function plugin(data: Params) {
        return new Promise((resolve, reject) => {
            axios({
                baseURL: downloadUrl,
                method: "get",
                url: data.url,
                responseType: data.ext !== 'json' ? "blob" : "json",
            }).then((res) => {
                resolve({
                    name: data.name,
                    ext: data.ext,
                    content: data.ext !== 'json' ? res.data : JSON.stringify(res.data)
                })
            }).catch(err => reject(err))
        })
    }

    return plugin

} 