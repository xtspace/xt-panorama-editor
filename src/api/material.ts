import { UploadSliceEnum, UploadTypeEnum } from "@/enum/upload";
import { request, AjaxResponse } from "@/utils/request";

export interface IMaterialData{
    records:Array<IMaterial>
    total:number
}

export interface IMaterial {
    fileId?:string
    name?:string
    id?:string
    directory?:boolean
    url?:string
    type:UploadTypeEnum
    parentId?:string
    panoType?:number | UploadSliceEnum
}

export interface IMaterialProps{
    keyword:string
    size:number
    current:number
    parentId:string
    type:UploadTypeEnum
}

export function getMaterialList(params: Partial<IMaterialProps>): AjaxResponse<IMaterialData> {
    return request.get('/material/list', { params })
}

export function addMaterial(data: IMaterial){
    return request.post('/material/insert', data)
}

export function deleteMaterial(id:string){
    return request.delete(`/material/${id}/delete`)
}

export function updateMaterial(data: {
    id:string
    name:string
}){
    return request.post(`/material/update`, data)
}

export function updateMultiMaterial(data: IMaterial[]){
    return request.post(`/material/batch/update`, data)
}

export interface IAddMaterialData{
    fileId:string
    name:string
    type:number
}

export function addMaterialListApi(data: {
    list: IAddMaterialData[],
    panoName: string
}) {
    return request.post(`/material/batch/insert`, data)
}