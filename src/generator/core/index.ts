import { IPanoDetailData } from "@/api/pano";
import { FlattenFile } from "@/types/generator/file";
import { offlineStore } from '@/utils/offline-store';
import Worker from "./worker?worker&inline";


export const enum ProcessEnum {
    RUN = "run",
    END = 'end',
    ERROR = 'error',
    START = 'start'
}

const { log } = console


export async function generateCore(data: IPanoDetailData, panoId: string): Promise<FlattenFile> {
    
    return new Promise((resolve, reject) => {

        const worker = new Worker();


        worker.postMessage({
            type: ProcessEnum.RUN,
            data,
            panoId
        });


        worker.onmessage = function (event: MessageEvent) {
            const { type, result, panoId } = event.data
            const downId = offlineStore.getOfflineData()
            switch (type) {
                case ProcessEnum.START:
                    log('开始下载');
                    offlineStore.setOfflineData([...downId, panoId])
                    break;
                case ProcessEnum.END:
                    log('下载完成');
                    offlineStore.setOfflineData(downId.filter(d => d !== panoId))
                    resolve(result)
                    worker.terminate();
                    break
                case ProcessEnum.ERROR:
                    log('下载失败');
                    offlineStore.setOfflineData(downId.filter(d => d !== panoId))
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
