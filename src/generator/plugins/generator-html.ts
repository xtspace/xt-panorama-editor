import { IPanoDetailData } from "@/api/pano"
import { cloneDeep, omit } from "lodash-es";

export default function pluginFactory() {

    function plugin(data:IPanoDetailData){
        const _data = cloneDeep(data)
        _data.scenes = (_data.scenes || []).map(d => omit(d, 'urls'));

        const content =  `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="./index.css">
                <title>${_data.title}</title>
            </head>
            <body>
                <div id="panoContainer"></div>
            </body>
            <script src="./krpano.js"></script>
            <script type="module" src="./index.js"></script>
            <script type="module" >
             const jsonData = ${JSON.stringify(_data)}
              new window.PanoPlayer(jsonData, { url: "krpano.xml", env: "offline" });
            </script>
            </html>
        `
        return {
            name: 'index',
            ext:"html",
            content
        }
    }
    
    return plugin

}