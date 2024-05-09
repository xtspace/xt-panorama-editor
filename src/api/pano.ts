import { AjaxResponse, request } from "@/utils/request";
import { HotspotTypeEnum } from '@/pages/editor-hotspot/config'
import { IFileInfo } from "./upload";
import { UploadSliceEnum } from "@/enum/upload";
import { IconMarkerEnum, IconTypeEnum } from "@/enum/hotspot";


export interface IPanoParams {
    keyword?: string
    current?: number
    size?: number
}

export function getPanoList(params: IPanoParams): AjaxResponse<IPanoData> {
    return request.get('/pano/page', { params })
}


export function deletePano(id: string) {
    return request.delete(`/pano/${id}`)
}


export function addPano(data: IPanoProps) {
    return request.post('/pano/insert', data)
}

export function updatePano(id:string, data:IPanoDetailData){
    return request.post(`/pano/${id}/update`, data)
}


export function getPanoImg(fileId: string) {
    return request.get(`/file/view/img/${fileId}/b`)
}

export function getPanoDetail(fileId: string): AjaxResponse<IPanoDetailData> {
    return request.get(`/pano/detail/${fileId}`)
}


export function panoStart(fileId:string){
    return request.post(`/pano/${fileId}/start`,null, {
        timeout:0
    })
}

// 增加浏览量
export function updateCount(fileId:string){
    return request.get(`/pano/viewCount/${fileId}`)
}

export function getPanoUrlsApi(idList:string[]){
    return request.post(`/file/pano/urls`, idList)
}


export interface IPanoData {
    size: number;
    total: number;
    current: number;
    records: Array<{
        count: number | undefined;
        scenes: any | undefined;
        updateTime: string | undefined;
        id: string
        title: string
        thumbUrl: string
    }>
}


interface IPanoProps {
    fileIds: string[]
    projectId: string
    title: string
    scenes: IPanoSceneData[]
}


export interface IPanoItem {
    fileId: string
    name: string
    thumbUrl: string
    multires: string
    type:UploadSliceEnum
    uid:string,
    xmlUrl?: string
}

export interface IHotSpotIcon {
    url?: string | undefined,
    ath: number,
    atv: number,
    oy?: number,
}

export interface IHotSpot {
    id: string,
    icon: IHotSpotIcon,
    next?: string,
    title?: string
    showTitle?: boolean
    scale?: number,
    type?: `${HotspotTypeEnum}`,
    imgs?: Array<IFileInfo>
    videos?: Array<IFileInfo>
    iconType: `${IconTypeEnum}`,
    textType: `${IconMarkerEnum}`
    audios?: Array<IFileInfo>
    content?: string
}


export interface IPanoSceneData {
    id: string,
    view: {
        hlookAt: number,
        fovMin: number,
        fovMax: number,
        vlookAt: number,
        fov: number,
    },
    pano?:IPanoItem,
    urls?:Array<string>
    hotspot: Array<IHotSpot>
}

export interface IPanoDetailData {
    materials: Array<string>;
    panos: Array<IPanoItem>,
    scenes: Array<IPanoSceneData>,
    profile: string
    title: string
    count: number
}
