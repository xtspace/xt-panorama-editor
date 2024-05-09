import { VideoCameraOutlined } from '@ant-design/icons';
import { Input, Modal, message } from 'antd';
import { deleteMaterial, IMaterial, updateMaterial } from '@/api/material';
import { UploadTypeEnum } from '@/enum/upload';
import { CodeEnum } from '@/enum/code';
import { useRef, useState } from 'react';
import folder from '@/assets/folder.png';
import MaterialTable from '@/components/material-table';

export default function MediaVideo() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
    const [previewFile, setPreviewFile] = useState<{name: string  | undefined, url: string | undefined}>()

    const materialRef = useRef<any>(null);



    const columns = [
        {
            title: '视频',
            dataIndex: 'url',
            render: (_: string, record: IMaterial) => (
                <div>
                    {
                        record.directory ? <img src={folder} /> : <VideoCameraOutlined />
                    }
                </div>
            )
        },
        {
            title: '文件夹/视频名称',
            dataIndex: 'name',
            render: (text: string, record: IMaterial) => (
                <Input ref={inputRef as any} defaultValue={text} onPressEnter={(event) => {
                    if (!record.id) return
                    inputRef.current?.blur()
                    const target = event.target as HTMLInputElement
                    updateMaterial({ id: record.id, name: target.value })
                }} />
            )
        },
        {
            title: '上传时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            render: (_: string, record: IMaterial) => (
                <>
                    {
                        !record.directory &&
                        <a className='mr-10 cursor-pointer' onClick={(e) => {
                            e.stopPropagation()
                            setPreviewFile({ ...setPreviewFile, name: record.name, url: record?.url })
                            setIsPlayingVideo(true)
                        }}>
                            预览
                        </a>
                    }
                    <a className='cursor-pointer' onClick={async (e) => {
                        e.stopPropagation()
                        if (!record.id) return
                        const res = await deleteMaterial(record.id)
                        res.data.code !== CodeEnum.SUCCESS && message.error("删除失败")
                        materialRef.current.reloadData()
                    }}>删除</a>
                </>
            ),
        },
    ]
    return <>
        <MaterialTable onRef={materialRef} tableColumns={columns} materialType={UploadTypeEnum.VIDEO} fileAccept='video/*' btnTitle='视频' />
        <Modal title={previewFile?.name} open={isPlayingVideo} width={900} footer={null} onCancel={() => setIsPlayingVideo(false)} destroyOnClose={true}>
            <video src={previewFile?.url} autoPlay controls className='w-full' />
        </Modal>
    </>
}
