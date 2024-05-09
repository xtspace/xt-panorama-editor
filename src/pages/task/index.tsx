import { useEffect, useRef } from 'react';
import { Button, Form, Input, message } from 'antd';
import { produce } from "immer";
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons'
import { useBoolean, useGetState, useSetState } from 'ahooks';
import { UploadPano } from "@/components/upload-pano"
import TaskSuccess from '@/assets/task-success.png'
import { useNavigate, Link } from 'react-router-dom';
import { IUploadData } from '@/api/upload';
import { CodeEnum } from '@/enum/code'
import { addPano, panoStart } from '@/api/pano';
import { uuid } from '@/utils/common'
import { getSceneInitConfig } from '@/utils/hotspot'
import { MenuEnum } from '../editor/menu.config';
import { cloneDeep, concat, every, has } from 'lodash-es';
import s from './index.module.less'
import { addMaterialListApi, IAddMaterialData, IMaterial } from '@/api/material'
import { UploadTypeEnum } from '@/enum/upload';

const { TextArea } = Input;

type PanoFile = IUploadData & {
    percent?: number, uid: string
}

export default function Task() {
    const projectId = useRef(uuid(20)).current

    const navigate = useNavigate();
    const [isEditor, { setTrue, setFalse }] = useBoolean(true);
    const [pregress, setPregress] = useSetState<{ percent: number, uid: string }>({ uid: "", percent: 0 })
    const [panoList, setPanoList, getPanoList] = useGetState<PanoFile[]>([])
    const [formData, setFormData] = useSetState<{ title: string, profile: string }>({ title: '', profile: '' })
    const [panoForm] = Form.useForm();

    const onFinish = async (values: {title: string, profile: string}) => {
        const res = await addPano({
            fileIds: panoList.map(d => d.fileId),
            scenes: panoList.map((d) => getSceneInitConfig(d.fileId)),
            projectId,
            ...values
        })
        const addList: IAddMaterialData[] = []
        panoList.map(panoItem => [
            addList.push({
                fileId: panoItem.fileId,
                name: panoItem.name,
                type: UploadTypeEnum.PANORAMA
            })
        ])
        await addMaterialListApi({ list: addList, panoName: values.title })
        res?.data.code === CodeEnum.SUCCESS ? setFalse() : message.info(res?.data.message)
        setFormData?.(produce(formData, draft => {
            if (!draft) return
            draft.title = values.title
            draft.profile = values.profile
        }))
    };



    const onClickDelete = (id: string) => {
        setPanoList(
            produce((draft: PanoFile[]) => {
                return draft.filter((d) => d.uid !== id);
            })
        )
    }


    const onLoadUpload = (data: PanoFile) => {
        setPanoList(produce(draft => {
            draft.push(data)
        }))
    }


    const onSucessUpload = (data: PanoFile) => {
        panoStart(data.fileId).then((res) => {
            const fileList = cloneDeep(getPanoList())?.map(d => {
                if (d.uid === res.data.result?.uid) {
                    d.thumbUrl = res.data.result?.thumbUrl
                    d.fileId = res.data.result?.fileId
                }
                return d
            })
            setPanoList(fileList)
        })
    }

    const materialUpload = (data: IMaterial[]) => {
        const fileList = cloneDeep(getPanoList())
        const newPanoList: PanoFile[] = []
        data?.map((dataItem:IMaterial) => {
            const uid = uuid(20)
            newPanoList.push({
                fileId: dataItem.fileId || '',
                name: dataItem.name || '',
                thumbUrl: `/file/view/img/${dataItem.fileId}/thumb.jpg`,
                uid
            })
        })
        setPanoList(concat(fileList, newPanoList))
    }

    useEffect(() => {
        if (isEditor) panoForm.setFieldsValue(formData);
    }, [isEditor])

    return <>
        <div className={s["task-page"].c("reset-antd flex justify-between")}>
            {isEditor ? <>
                <div className={s["left"]}>
                    <div className='flex justify-between'>
                        <Button type="primary" onClick={() => navigate("/tour")}><LeftOutlined />返回</Button>
                        <UploadPano<PanoFile> id={projectId} onpregress={setPregress} onload={onLoadUpload} onSucess={onSucessUpload} btnText='从本地文件添加' taskUpload={materialUpload} />
                    </div>
                    <div className={s["content"].c("mt-16")}>
                        {
                            panoList?.map((d, idx) => {
                                return <div key={idx} className={s["item"].c("flex")}>
                                    {
                                        d.thumbUrl ? <img src={d.thumbUrl} /> : <div className='flex-center'>
                                            {pregress.uid === d.uid ? (pregress.percent !== 100 ? pregress.percent + '%' : "制作中") : "制作中"}
                                        </div>
                                    }

                                    <div className='flex flex-col justify-between' >
                                        <span>{d.name}</span>
                                        <div onClick={() => onClickDelete(d.uid!)}>
                                            <DeleteOutlined />
                                        </div>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
                <div className={s["right"]}>
                    <Form
                        form={panoForm}
                        name="basic"
                        onFinish={onFinish}
                        labelCol={{ span: 6 }}
                    >
                        <Form.Item
                            label="全景标题"
                            name="title"
                            rules={[{ required: true, message: '请输入全景标题!' }]}
                        >
                            <TextArea showCount maxLength={200} />
                        </Form.Item>
                        <Form.Item
                            label="全景简介"
                            name="profile"
                        >
                            <TextArea showCount maxLength={10000} rows={15} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!(panoList.length > 0 && every(panoList, d => has(d, "thumbUrl")))}>创建全景</Button>
                    </Form>
                </div></> : <div className={s["editor-container"].c("flex flex-col flex-items-center justify-center")}>
                <div className='flex flex-col flex-items-center'>
                    <img src={TaskSuccess} alt="" width="140" />
                    <span>创建成功</span>
                </div>
                <Button type='primary' className='mt-20' onClick={() => navigate(`/editor/basic/${projectId}`, { state: MenuEnum.BASIC })}>编辑作品</Button>
                <Link to={`/preview/${projectId}`} target='_blank'>
                    <Button type="text">查看作品</Button>
                </Link>
                <Button type="text" onClick={setTrue}>返回继续编辑</Button>
            </div>}

        </div>
    </>
}