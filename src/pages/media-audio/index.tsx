import { AudioOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import { IMaterial, updateMaterial } from '@/api/material';
import { UploadTypeEnum } from '@/enum/upload';
import folder from '@/assets/folder.png';
import MaterialTable from '@/components/material-table';
import { useRef, useState } from 'react';

export default function MediaAudio() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
    const [previewFile, setPreviewFile] = useState<{ name: string | undefined, url: string | undefined }>()

    const materialRef = useRef<any>(null);



    const columns = [
        {
            title: '音频',
            dataIndex: 'url',
            render: (_: string, record: IMaterial) => (
                <div>
                    {
                        record.directory ? <img src={folder} /> : <AudioOutlined />
                    }
                </div>
            )
        },
        {
            title: '文件夹/音频名称',
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
                            setIsPlayingAudio(true)
                        }}>
                            预览
                        </a>
                    }
                    <a className='cursor-pointer' onClick={async (e) => {
                        e.stopPropagation()
                        if (!record.id) return
                        materialRef.current.delMaterial({ id: record.id, tips: record.directory ? '文件夹' : '音频', name: record.name });
                    }}>删除</a>
                </>
            ),
        },
    ]
    return <>
        <MaterialTable onRef={materialRef} tableColumns={columns} materialType={UploadTypeEnum.AUDIO} fileAccept='audio/*' btnTitle='音频' />
        <Modal title={previewFile?.name} open={isPlayingAudio} width={400} footer={null} onCancel={() => setIsPlayingAudio(false)} destroyOnClose={true}>
            <audio src={previewFile?.url} autoPlay controls className='w-full' />
        </Modal>
    </>
}
