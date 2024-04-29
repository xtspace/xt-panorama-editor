import {IProjectTemplate} from '@/types/generator/core'
import { ResultDir } from '@/types/generator/file'
import { generateStaticFiles } from './static-files'

export const template:IProjectTemplate = {
    slots:{
        html:{
            path:['html']
        },
        resource:{
            path:['html']
        },
        panoFile:{
            path:['html']
        },
        main:{
            path:['html']
        },
        tool:{
            path:['tool']
        }
    },
    generateTemplate():ResultDir {
        return generateStaticFiles()
    },
}   