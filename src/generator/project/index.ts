import { IPanoDetailData } from "@/api/pano";
import { IProjectPlugins, IProjectTemplate, PostProcessor } from "@/types/generator/core";
import { ResultDir, ResultFile } from "@/types/generator/file";
import { addDirectory, addFile, createResultDir, flattenResult } from "@/utils/generator-result-helper";
import { asyncPool } from "@/utils/common";

interface IModuleInfo {
    moduleName?: string;
    path: string[];
    files: ResultFile;
}


export interface ProjectBuilderInitOptions {
    template: IProjectTemplate;
    plugins: IProjectPlugins["plugins"];
    postProcessors: PostProcessor[]
}



class Builder {
    private template: IProjectTemplate
    private plugins: IProjectPlugins["plugins"]
    private postProcessors: PostProcessor[]

    constructor(params: ProjectBuilderInitOptions) {
        this.template = params.template
        this.plugins = params.plugins
        this.postProcessors = params.postProcessors
    }

    async generateProject(data: IPanoDetailData, panoId: string) {
        const projectRoot = this.template.generateTemplate();
        const buildResult: IModuleInfo[] = [];
        const builders = this.createModuleBuilders();

        if (this.plugins.html) {
            const files = builders.html(data)
            buildResult.push({
                path: this.template.slots.html.path,
                files
            })
        }



        if (this.plugins.resource) {
            const urls:string[]  = []

            for (const scene of data.scenes) {
                scene.hotspot?.forEach(h => {
                    if (h.icon.url?.includes('assets/') && !urls.find(urlItem => urlItem === h.icon.url)) {
                        urls.push(h.icon.url!)
                    }
                })
            }
            urls.push(`/api/file/download/zip?panoId=${panoId}`)

            await asyncPool<ResultFile>(50, urls, async (item) => {
                const res = await builders.resource(await item)
                if (item.includes('/api/file/download/zip?panoId=')) {
                    res.map((resItem: {name: string, ext: string, content: Blob}) => {
                        buildResult.push({
                            path: this.template.slots.resource.path,
                            files: resItem
                        })
                    })
                } else {
                    buildResult.push({
                        path: this.template.slots.resource.path,
                        files: res
                    })
                }
            })
        }


        if (this.plugins.panoFile) {
            const paths = ['krpano.js', 'krpano.xml', 'webvr.js', 'skin/vtourskin.xml', 'plugins/webvr.xml'];
            const promise = paths.map(async p => await builders.panoFile(p))

            const files = await Promise.all(promise)

            files?.map(d => {
                buildResult.push({
                    path: this.template.slots.panoFile.path,
                    files: d
                })
            })
        }


        if (this.plugins.main) {
            const paths = [
                {
                    url: "https://xtspace.cc:8310/offline/js/index.js",
                    name: "index",
                    ext: "js"
                }, {
                    url: "https://xtspace.cc:8310/offline/css/index.css",
                    name: "index",
                    ext: "css"
                }
            ]
            const promise = paths.map(async p => await builders.main(p))
            const files = await Promise.all(promise)
            files?.map(d => {
                buildResult.push({
                    path: this.template.slots.main.path,
                    files: d
                })
            })
        }




        if(this.plugins.tool){
            const paths = [
                {
                    url: "./tool/window点击运行.exe",
                    name: "window点击运行",
                    ext: "exe"
                },
                {
                    url: "./tool/mac点击运行.exe",
                    name: "mac点击运行",
                    ext: ""
                },
                {
                    url: "./tool/linux命令行运行.exe",
                    name: "linux命令行运行",
                    ext: ""
                }
            ]
            const promise = paths.map(async p => await builders.tool(p))
            const files = await Promise.all(promise)

            files?.map(d => {
                buildResult.push({
                    path: this.template.slots.tool.path,
                    files: d
                })
            })
        }

        buildResult.forEach((module) => {
            let targetDir = getDirFromRoot(projectRoot, module.path);
            const { ext, content } = module.files;
            this.postProcessors.forEach((processer) => {
                module.files.content = processer(content, ext);
            });
            if (module.moduleName) {
                const dir = createResultDir(module.moduleName);
                addDirectory(targetDir, dir);
                targetDir = dir;
            }
            addFile(targetDir, module.files);
        })

        const flatteResult = flattenResult(projectRoot);
        return flatteResult;
    }



    createModuleBuilders() {
        const builders: Record<string, any> = {};
        Object.keys(this.plugins)?.forEach((pluginName) => {
            if (this.plugins[pluginName].length > 0) {
                builders[pluginName] = this.plugins[pluginName]?.reduce((previousPluginOperation, plugin: Function) => {
                    return plugin(previousPluginOperation);
                }, this.plugins[pluginName][0]);
            }
        });
        return builders;
    }

}

export function projectBuilder(initOptions: ProjectBuilderInitOptions) {
    return new Builder(initOptions);
}

function getDirFromRoot(root: ResultDir, path: string[]): ResultDir {
    let current: ResultDir = root;
    path.forEach((p) => {
        const exist = current.dirs.find((d) => d.name === p);
        if (exist) {
            current = exist;
        } else {
            const newDir = createResultDir(p);
            addDirectory(current, newDir);
            current = newDir;
        }
    });

    return current;
}