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
            }).then((res) => {
                let content = res.data;

                if (data.name === "index" && data.ext === "js") {
                    content = content.replace(/https:\/\/xtspace\.cc:8310\//g, '');
                }

                resolve({
                    name: data.name,
                    ext: data.ext,
                    content: content
                });
            }).catch(err => reject(err));
        });
    }


    return plugin

}