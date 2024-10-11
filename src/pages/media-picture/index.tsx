import { Input } from 'antd';
import { IMaterial, updateMaterial } from '@/api/material';
import { UploadTypeEnum } from '@/enum/upload';
import folder from '@/assets/folder.png'
import MaterialTable from '@/components/material-table';
import { useRef } from 'react';

export default function MediaPicture() {
    
    const inputRef = useRef<HTMLInputElement>(null);

    const materialRef = useRef<any>(null);



    const columns = [
        {
            title: '图片',
            dataIndex: 'thumb',
            render: (thumb: string, record: IMaterial) => (
                <img src={record.directory ? folder : thumb} />
            )
        },
        {
            title: '文件夹/图片名称',
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
                    <a className='cursor-pointer' onClick={async (e) => {
                        e.stopPropagation();
                        if (!record.id) return
                        materialRef.current.delMaterial({ id: record.id, tips: record.directory ? '文件夹' : '图片', name: record.name });
                    }}>删除</a>
                </>
            ),
        },
    ]


    return <>
        <MaterialTable onRef={materialRef} tableColumns={columns} materialType={UploadTypeEnum.IMAGE} fileAccept='image/*' btnTitle='图片' />
    </>
}
