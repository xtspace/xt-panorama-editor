import { projectBuilder } from "../project";
import { template } from "../project/template";
import html from "../plugins/generator-html";
import resource from '../plugins/generator-resource';
import prettier from "../postprocessor/prettier";
import panoFile from "../plugins/generator-krpano-files";
import main from "../plugins/generator-main";
import tool from "../plugins/generator-tool";

export function createProjectBuilder(){
    return projectBuilder({
        template:template,
        plugins:{
            html:[html],
            resource:[resource],
            panoFile:[panoFile],
            main:[main],
            tool:[tool]
        },
        postProcessors:[
            prettier()
        ]
    })
}
