import { IPanoDetailData } from "@/api/pano";
import { FlattenFile } from "@/types/generator/file";

export const enum ProcessEnum {
    RUN = "run",
    END = 'end',
    ERROR = 'error',
    START = 'start'
}

const { log } = console

const isDev = import.meta.env.DEV;

const DEFAULT_WORKER_JS = isDev ? "./worker.ts" : "./static/js/generator-worker.js";


export async function generateCore(data: IPanoDetailData, panoId: string): Promise<FlattenFile> {
    
    const workerJs = await loadWorkerJs(DEFAULT_WORKER_JS);
    return new Promise((resolve, reject) => {

        const worker = new Worker(new URL(workerJs.url, import.meta.url).href, { type: 'module' });


        worker.postMessage({
            type: ProcessEnum.RUN,
            data,
            panoId
        });


        worker.onmessage = function (event: MessageEvent) {
            const { type, result } = event.data

            switch (type) {
                case ProcessEnum.START:
                    log('开始下载');
                    break;
                case ProcessEnum.END:
                    log('下载完成');
                    resolve(result)
                    worker.terminate();
                    break
                case ProcessEnum.ERROR:
                    log('下载失败');
                    resolve(result)
                    break
            }
        }

        worker.onerror = function (err) {
            reject(err)
            worker.terminate();
        }

    })
}

async function loadWorkerJs(workerJsUrl: string) {
    const workerJsContent = !isDev
        ? await fetch(workerJsUrl)
            .then((res) => res.text())
            .catch((err) => {
                throw new Error(`Failed to fetch worker js: ${err}`);
            })
        : "";

    const workerJs = {
        url: isDev
            ? new URL(workerJsUrl, import.meta.url).href
            : self.URL.createObjectURL(new self.Blob([workerJsContent], { type: "application/javascript" })),
    };

    return workerJs;
}

