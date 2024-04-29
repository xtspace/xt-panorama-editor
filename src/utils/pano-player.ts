import { Subject } from 'rxjs'
import { IPanoDetailData } from "@/api/pano";
import { delay } from 'lodash-es';

export const enum EnvEnum {
    OFFLINE = "offline",
    ONLINE = "online"
}

interface IPanoConfig {
    url: string,
    env?: `${EnvEnum}`
}

export const panoSubject = new Subject<{
    data: IPanoDetailData
    panoConfig: IPanoConfig
}>()


class PanoPlayer {
    constructor(data:IPanoDetailData, panoConfig:IPanoConfig) {
       delay(() => {
            panoSubject.next({data, panoConfig})
       },10)
    }
}


window.PanoPlayer = PanoPlayer;