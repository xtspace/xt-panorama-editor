import { Input, message } from 'antd';
import { deleteMaterial, IMaterial, updateMaterial } from '@/api/material';
import { UploadTypeEnum } from '@/enum/upload';
import { CodeEnum } from '@/enum/code';
import { useRef } from 'react';
import folder from '@/assets/folder.png';
import MaterialTable from '@/components/material-table';


export default function MediaPanorama() {

    const inputRef = useRef<HTMLInputElement>(null);

    const materialRef = useRef<any>(null);

    const columns = [
        {
            title: '全景',
            dataIndex: 'url',
            render: (_: string, record: IMaterial) => (
                <img src={record.directory ? folder : `/file/view/img/${record.fileId}/thumb.jpg`} />
            )
        },
        {
            title: '文件夹/全景名称',
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
            title: '全景类型',
            dataIndex: 'panoType',
            render: (type: number | undefined) => (
                <>
                    {
                        type ? <>
                        {
                            type === 1 ? <span>六面体模式</span> : <span>分片模式</span>
                        }
                        </>: <></>
                    }
                </>
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
                    <a className='cursor-pointer' onClick={async () => {
                        if (!record.id) return
                        const res = await deleteMaterial(record.id)
                        if (res.data.code !== CodeEnum.SUCCESS) return message.error("素材已被使用无法删除！")
                        materialRef.current.reloadData()
                    }}>删除</a>
                </>
            ),
        },
    ]


    return <>
        <MaterialTable onRef={materialRef} tableColumns={columns} materialType={UploadTypeEnum.PANORAMA} btnTitle='全景' />
    </>
}
