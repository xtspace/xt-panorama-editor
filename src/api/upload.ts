import { request, AjaxResponse } from "@/utils/request";
import { UploadTypeEnum } from '@/enum/upload';


export interface IUploadData {
    thumbUrl: string
    fileId: string
    name: string

}
export function uploadPano(
    id: string, 
    data: FormData, 
    onpregress: ({ percent, uid }: { percent: number, uid: string }) => void): AjaxResponse<IUploadData> {
    return request.post(`/pano/upload/${id}`, data, {
        onUploadProgress(progressEvent) {
            const { loaded, total } = progressEvent;
            const percent = Math.floor((loaded / total!) * 100);
            onpregress({percent, uid:data.get("uid") as string});
        }
    })
}


export interface IFileInfo {
    id: string,
    url: string,
    name: string,
    response?: any,
    realFileName?: string
}

export interface IPanoFile {
    thumbUrl: string,
    name: string,
    fileId: string,
    type: number
}

export function uploadFile(type: UploadTypeEnum, data: FormData, signal?: AbortSignal): AjaxResponse<IFileInfo> {
    return request.post(`/material/upload/${type}`, data, { signal })
}

export function downloadZip(id: string): AjaxResponse<any> {
    return request.get(`/file/download/zip?fileId=${id}`)
}