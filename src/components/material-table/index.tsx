import { PlusOutlined, FolderOutlined, FolderAddOutlined } from '@ant-design/icons';
import { Button, Table, Input, Modal, Form, message, Spin } from 'antd';
import SearchInput from '@/components/search-input';
import { addMaterial, IMaterial, IMaterialData, updateMultiMaterial } from '@/api/material';
import { UploadTypeEnum } from '@/enum/upload';
import { CodeEnum } from '@/enum/code';
import { produce } from 'immer';
import ModelUpload from '@/components/model-upload/index.model';
import s from './index.module.less'
import CatalogueModel from '@/components/catalogue-folder';
import MoveModel from '@/components/move-model'
import { useEffect, useImperativeHandle, useState } from 'react';
import { useBoolean } from 'ahooks';
import useAddMaterial from '@/hooks/useAddMaterial';
import { cloneDeep, concat } from 'lodash-es';
import { IFileInfo, IPanoFile } from '@/api/upload';
import { ColumnsType } from 'antd/es/table';
import { UploadPano } from '../upload-pano';
import { panoStart } from '@/api/pano';

interface IProps {
    materialType: UploadTypeEnum
    tableColumns?: ColumnsType<IMaterial>
    fileAccept?: string
    btnTitle: string
    onRef: any
}

export default function MaterialTable(props: IProps) {
    const { materialType, tableColumns, fileAccept, btnTitle, onRef } = props

    const [form] = Form.useForm()

    const [isvisible, { setTrue, setFalse }] = useBoolean(false);

    const [loading, setLoading] = useState<boolean>(false);

    const [isAddFolder, setIsAddFolder] = useState<boolean>(false);

    const [isMoveFolder, setIsMoveFolder] = useState<boolean>(false);

    const [tableData, , requestParams, setRequestParams] = useAddMaterial(materialType)

    // 当前文件夹的id，根目录则没有
    const [folderId, setFolderId] = useState<string>('0');

    const [folderList, setFolderList] = useState<{
        id: string
        name: string
    }[]>([]);

    const [moveData, setMoveData] = useState<IMaterial[]>([]);

    const [moveToId, setMoveToId] = useState<string>('0')

    const [moveKey, setMoveKey] = useState<string[]>([])

    useImperativeHandle(onRef, () => ({
        reloadData: () => setRequestParams(requestParams)
    }))

    const uploadCallback = async (data: IFileInfo[]) => {
        const res = await Promise.allSettled(data.map(d => addMaterial({ type: materialType, fileId: d.id, name: d.realFileName, parentId: folderId })))
        res?.map(d => {
            if (d.status === "fulfilled" && d.value.data.code === CodeEnum.SUCCESS) return setRequestParams(requestParams)
        })
    }

    const uploadPanoCallback = async (data: IPanoFile, fileCount: { total: number, now: number }) => {
        await panoStart(data.fileId)
        await addMaterial({ type: materialType, fileId: data.fileId, name: data.name, parentId: folderId, panoType: data.type })
        fileCount.total === fileCount.now && setLoading(false), setRequestParams(requestParams)
    }

    const onClickAddFolder = async () => {
        const res = await addMaterial({
            parentId: folderId,
            type: materialType,
            directory: true,
            name: form.getFieldValue('name')
        })
        form.resetFields()
        setIsAddFolder(false)
        res.data.code === CodeEnum.SUCCESS && setRequestParams(requestParams)
    }

    const onDoubleClickInFolder = (row: IMaterial) => {
        if (!row?.id) return
        setFolderId(row?.id)
        setFolderList(produce(draft => {
            return concat(draft, {
                id: row?.id,
                name: row.name
            })
        }))
    }

    const onClickSelectRow = (row: IMaterial) => {
        setMoveKey(produce(draft => {
            return moveKey.find(m => m === row.id) ? draft.filter(d => d !== row.id) : concat(draft, row.id)
        }))
        setMoveData(produce(draft => {
            return moveKey.find(m => m === row.id) ? draft.filter(d => d.id !== row.id) : concat(draft, [row])
        }))
    }

    const resetFolderList = (id:string) => {
        if (folderList.length <= 0) return
        const nowFolderIndex = folderList.findIndex((item:any) => item?.id === id)
        id === '0' ? setFolderList([]) : setFolderList(folderList.slice(0, nowFolderIndex + 1))
    }

    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys: moveKey,
        onChange: (selectedRowKeys: string[], selectedRows: IMaterialData['records'][0][]) => {
            setMoveKey(selectedRowKeys)
            setMoveData(selectedRows)
        }
    }

    const updatePosition = async () => {
        const _moveList = cloneDeep(moveData)
        _moveList?.map((listItem:any) => {
            listItem.parentId = moveToId
        })
        const res = await updateMultiMaterial(_moveList)
        message.error(res.data.code === CodeEnum.SUCCESS ? "移动成功" : "移动失败")
        res.data.code !== CodeEnum.SUCCESS && setMoveKey([])
        setIsMoveFolder(false)
        setRequestParams(requestParams)
    }

    const cancelMove = () => {
        setMoveToId('0')
        setIsMoveFolder(false)
    }

    useEffect(() => {
        setMoveKey([])
        setMoveData([])
        setRequestParams({ parentId: folderId })
    }, [folderId])



    return <>
        <Spin spinning={loading}>
            <div className='flex justify-between'>
                <SearchInput
                    onFinish={(val) => setRequestParams({ ...val, current: 1 })}
                />
                <div>
                    <Button
                        type='primary'
                        className='mr-10'
                        onClick={() => {
                            if (moveKey.length < 1) return message.error("选择需要移动的文件和文件夹")
                            setIsMoveFolder(true)
                        }}
                    >
                        <FolderOutlined />移动到
                    </Button>
                    <Button type='primary' className='mr-10' onClick={() => setIsAddFolder(true)}>
                        <FolderAddOutlined />添加文件夹
                    </Button>
                    {
                        btnTitle === '全景' ? <UploadPano<any>
                            id='panoramicmaterial'
                            onload={() => {setLoading(true)}}
                            onpregress={() => {}}
                            onSucess={uploadPanoCallback}
                            btnText='上传全景'
                            taskUpload={() => {}}
                        /> : <Button type='primary' onClick={setTrue}>
                            <PlusOutlined />上传{btnTitle}
                        </Button>
                    }
                </div>
            </div>

            <CatalogueModel folderId={folderId} folderList={folderList} setShowFolder={setFolderId} setShowList={resetFolderList} />

            <Table
                rowKey="id"
                className={s["material-table"].c('mt-20')}
                rowSelection={rowSelection}
                columns={tableColumns}
                dataSource={tableData.list}
                pagination={{
                    pageSize: requestParams.size,
                    total: tableData?.total,
                    onChange: (current, size) => {
                        setRequestParams({ current, size })
                    }
                }}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            if (!record.directory) return
                            onDoubleClickInFolder(record)
                        },
                        onClick: () => {
                            onClickSelectRow(record)
                        }
                    };
                }}
                locale={{emptyText: '暂无数据'}}
            />
        </Spin>

        <ModelUpload accept={fileAccept!} uploadType={materialType} isvisible={isvisible} setFalse={setFalse} callback={uploadCallback} />

        <Modal title='新建文件夹' okText="确定" cancelText="取消" open={isAddFolder} onOk={onClickAddFolder} onCancel={() => {
            setIsAddFolder(false)
            form.resetFields()
        }}>
            <Form form={form} className='mt-20'>
                <Form.Item label="文件夹名称" name="name">
                    <Input placeholder='请输入文件夹名称' />
                </Form.Item>
            </Form>
        </Modal>
        <Modal title="移动到..." open={isMoveFolder} okText="确定" cancelText="取消" onCancel={cancelMove} onOk={updatePosition} destroyOnClose={true}>
            <MoveModel moveList={moveData} materialType={materialType} setToId={setMoveToId} />
        </Modal>
    </>
}
