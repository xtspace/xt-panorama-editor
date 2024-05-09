
import { IPanoDetailData } from '@/api/pano'
import { HotspotTypeEnum } from './config'

export interface IFormConfig {
    label: string
    name: string
    type: string
    fieldNames?: {
        label: string
        value: string
    },
    valuePropName?: string
    getOptionData?: (data: IPanoDetailData) => any
    getValueFromEvent?: (e: any) => any
    placeholder?: string,
}

export const FormItemTypeEnum = {
    SELECT: "select",
    IMGUPLOAD: "img-upload",
    TEXTAREA: "textarea",
    UPLOAD: "upload",
    AUDIOUPLOAD: "audio-upload",
}

export const formConfig: { [key in HotspotTypeEnum]: IFormConfig[] } = {
    [HotspotTypeEnum.LINK]: [
        {
            label: "目标场景",
            name: "next",
            placeholder: "请选择跳转场景",
            type: FormItemTypeEnum.SELECT,
            fieldNames: { label: "name", value: "fileId" },
            getOptionData: (data: IPanoDetailData) => {
                return data?.scenes?.map(d => d.pano)
            }
        }
    ],
    [HotspotTypeEnum.IMG]: [
        {
            label: "图文设置",
            name: "imgs",
            type: FormItemTypeEnum.IMGUPLOAD
        }
    ],
    [HotspotTypeEnum.TEXT]: [
        {
            label: "文字设置",
            name: "content",
            type: FormItemTypeEnum.TEXTAREA
        }
    ],
    [HotspotTypeEnum.VIDEO]: [
        {
            label: "视频设置",
            name: "videos",
            valuePropName: "fileList",
            getValueFromEvent: (e) => {
                if (Array.isArray(e)) {
                    return e;
                }

                return e.file && e.fileList;
            },
            type: FormItemTypeEnum.UPLOAD
        }
    ],
    [HotspotTypeEnum.AUDIO]: [
        {
            label: "音频设置",
            name: "audios",
            valuePropName: "fileList",
            getValueFromEvent: (e) => {
                if (Array.isArray(e)) {
                    return e;
                }

                return e.file && e.fileList;
            },
            type: FormItemTypeEnum.AUDIOUPLOAD
        }
    ],
}