import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Form, message } from 'antd';
import s from './index.module.less';
import { IFileInfo, uploadFile } from '@/api/upload';
import { UploadTypeEnum } from '@/enum/upload';
import { CodeEnum } from '@/enum/code';

const { Dragger } = Upload;


export interface IModelUploadProps {
    isvisible: boolean
    accept: string
    setFalse: () => void
    callback: (data: IFileInfo[]) => void
    uploadType: UploadTypeEnum
}

let abortController: AbortController

export default function ModelUpload(props: IModelUploadProps) {
    const [form] = Form.useForm();


    const customRequest = async (options: {
        file: File;
        onSuccess: (response: any, file: any) => void;
        onError: (response: any) => void
    }) => {
        const formData = new FormData();
        formData.append("file", options.file)
        if (options.file.size > 100 * 1024 * 1024) return message.error("素材大小不能超过100M")

        abortController = new AbortController()
        const fileInfo = await uploadFile(props.uploadType, formData, abortController.signal)
        if (fileInfo.data?.code === CodeEnum.SUCCESS) {
            options.onSuccess(fileInfo?.data?.result, options.file)
        } else {
            options.onError(fileInfo.data.result)
        }
    }


    const handleClose = () => {
        props.setFalse()
        form.resetFields()
        abortController?.abort()
    }

    const onOk = () => {
        props.callback(form.getFieldValue("fileList")?.map((d: any) => d.response)?.filter(Boolean))
        handleClose()
    }

    return <Modal className={s["model-upload"]} open={props.isvisible} maskClosable={false} okText='确定' cancelText='取消' onOk={onOk} onCancel={handleClose}>
        <Form form={form}>
            <Form.Item name="fileList" valuePropName='fileList' getValueFromEvent={
                (e) => {
                    if (Array.isArray(e)) {
                        return e;
                    }

                    return e.file && e.fileList;
                }
            }>
                <Dragger
                    className={s["upload-box"]}
                    accept={props.accept}
                    multiple
                    customRequest={customRequest as any}
                >
                    <p className="ant-upload-drag-icon">
                        <PlusOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽上传</p>
                </Dragger>
            </Form.Item>
        </Form>
    </Modal >
}