import { uploadPano } from "@/api/upload";
import { UploadSliceEnum } from "@/enum/upload";
import { isPanoImage, uuid } from "@/utils/common";
import { Button, Dropdown, type MenuProps, message } from "antd";
import { useRef, useState } from "react";
import { PlusOutlined } from '@ant-design/icons'
import MaterialModel from "../material-model";
import { UploadTypeEnum } from "@/enum/upload";
import { getPanoUrlsApi } from '@/api/pano';
import { getSceneInitConfig } from '@/utils/hotspot';
import { cloneDeep } from "lodash-es";
import { panoStore } from '@/utils/pano-store';
import { IMaterial } from "@/api/material";


const uploadItems = [
    {
        key: UploadSliceEnum.CUBE,
        label: "六面体模式",
    },
    {
        key: UploadSliceEnum.SPHERE,
        label: "分片模式",
    },
];

const setPanoData = panoStore.setPanoData
const getPanoData = panoStore.getSnapshot
interface IProps<T> {
    id: string,
    onload: (data: T) => void
    onpregress: ({ percent, uid }: { percent: number, uid: string }) => void
    onSucess: (data: any, fileCount: { now: number, total: number }) => void
    btnText: string
    taskUpload: (data: IMaterial[]) => void
}

export function UploadPano<T>({ id, onload, onpregress, onSucess, btnText, taskUpload }: IProps<T>) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [uploadType, setUploadType] = useState<UploadSliceEnum>(UploadSliceEnum.CUBE)
    const [showMaterial, setShowMaterial] = useState(false)

    const onClickUpload: MenuProps["onClick"] = ({ key }) => {
        if (!key) return
        inputRef.current?.click()
        setUploadType(key as unknown as UploadSliceEnum)
    }


    const onChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
        const files = evt.target.files ?? []
        for (let i = 0; i < files.length; i++) {
            if (!files[i]) return
            const formData = new FormData();
            const uid = uuid(20)
            formData.append("file", files[i]);
            formData.append("type", uploadType);
            formData.append("uid", uid);

            const isPano = await isPanoImage(files[i])
            if (isPano) {
                onload({ name: files[i].name, uid } as T)

                const res = await uploadPano(id, formData, onpregress)
                onSucess(res?.data?.result, { now: i + 1, total: files.length })
            } else {
                message.error("请上传全景图片")
            }
        }
        if (inputRef.current !== null) inputRef.current.value = '';
    }

    const addSelectData = async (addTableData: IMaterial[]) => {
        const _panoData = cloneDeep(getPanoData())
        if (!location.href.includes('task')) {
            const fileIdList: string[] = []
            addTableData.map((selectItem: IMaterial) => {
                selectItem.fileId && fileIdList.push(selectItem.fileId)
            })
            const res = await getPanoUrlsApi(fileIdList)
            addTableData.map((dataItem: IMaterial) => {
                const uid = uuid(20)
                dataItem?.fileId && _panoData?.scenes.push({
                    ...getSceneInitConfig(dataItem.fileId),
                    pano: {
                        fileId: dataItem.fileId,
                        multires: res.data.result[dataItem.fileId].file.multires,
                        name: res.data.result[dataItem.fileId].file.realFileName,
                        thumbUrl: `/file/view/img/${dataItem.fileId}/thumb.jpg`,
                        type: dataItem.panoType,
                        uid,
                        xmlUrl: `/file/view/xml/${dataItem.fileId}`
                    },
                    urls: res.data.result[dataItem.fileId].urls
                })
            })
            setPanoData(_panoData)
        } else {
            taskUpload(addTableData)
        }
        setShowMaterial(false)
    }


    return <>
        <div className="inline-block">
            <Dropdown
                menu={{ items: uploadItems, onClick: onClickUpload }} >
                <Button type="primary" >
                    {
                        btnText === '上传全景' ? <PlusOutlined /> : <></>
                    }
                    {btnText}
                </Button>
            </Dropdown>
            {
                btnText !== '上传全景' && <Button type="primary" className="ml-10" onClick={() => setShowMaterial(true)} >
                    素材文件
                </Button>
            }
        </div>
        {
            showMaterial && <MaterialModel setIsShow={setShowMaterial} materialType={UploadTypeEnum.PANORAMA} submitSelect={addSelectData} />
        }
        <input type="file" multiple ref={inputRef} className="hidden" accept='image/*' onChange={onChange} />
    </>
}