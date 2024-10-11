import { Modal, Table } from "antd";
import SearchInput from '@/components/search-input';
import { useState, useEffect } from 'react';
import CatalogueModel from '@/components/catalogue-folder';
import useAddMaterial from '@/hooks/useAddMaterial'
import { UploadTypeEnum } from "@/enum/upload";
import { produce } from 'immer';
import { concat } from "lodash-es";
import folder from '@/assets/folder.png';
import { VideoCameraOutlined, AudioOutlined } from '@ant-design/icons';
import { IMaterial } from '@/api/material';
import { panoStore } from '@/utils/pano-store';


interface IProps {
    setIsShow: (v: boolean) => void
    materialType: UploadTypeEnum
    submitSelect: (data: IMaterial[]) => void
}
const getPanoData = panoStore.getSnapshot

export default function MaterialModel(props: IProps) {
    const { setIsShow, materialType, submitSelect} = props
    const [folderId, setFolderId] = useState<string>('0');
    const [folderList, setFolderList] = useState<{ id: string, name: string }[]>([]);
    const [tableData, , requestParams, setRequestParams] = useAddMaterial(materialType)
    const [addKey, setAddKey] = useState<string[] | React.Key[]>([])
    const [addTableData, setAddTableData] = useState<IMaterial[]>([]);
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');


    const resetFolderList = (id:string) => {
        if (folderList.length <= 0) return
        const nowFolderIndex = folderList.findIndex((item) => item?.id === id)
        id === '0' ? setFolderList([]) : setFolderList(folderList.slice(0, nowFolderIndex + 1))
    }

    const onDoubleClickFolder = (row: any) => {
        setFolderId(row?.id)
        setFolderList(produce(draft => {
            return concat(draft, {
                id: row?.id,
                name: row.name
            })
        }))
    };

    const onClickSelectRow = (row: IMaterial) => {
        if (panoIsUse(row)) return
        setAddKey(produce(draft => {
            return addKey.find(d => d === row.id) ? draft.filter(d => d !== row.id) : concat(draft, row.id)
        }))
        setAddTableData(produce(draft => {
            return addKey.find(d => d === row.id) ? draft.filter(d => d.id !== row.id) : concat(draft, [row])
        }))
    }

    const panoIsUse = (row: IMaterial) => {
        return row.type === UploadTypeEnum.PANORAMA && (getPanoData()?.scenes.find(panoItem => panoItem.id === row.fileId) && !location.href.includes('task'))
    }

    const loadPreviewUrl = (id: string | undefined, type: number, url: string | undefined) => {
        switch (type) {
            case UploadTypeEnum.IMAGE:
                return <img src={url} alt="" className="w-30 h-30" />
            case UploadTypeEnum.VIDEO:
                return <VideoCameraOutlined className="w-30 h-30" />
            case UploadTypeEnum.PANORAMA:
                return <img src={`/file/view/img/${id}/thumb.jpg`} alt="" className="w-30 h-30" />
            case UploadTypeEnum.AUDIO:
                return <AudioOutlined className="w-30 h-30" />
        }
    }

    const rowSelections = {
        selectedRowKeys: addKey,
        onChange: (selectedRowKeys: React.Key[], selectedRows: IMaterial[]) => {
            setAddKey(selectedRowKeys)
            setAddTableData(selectedRows)
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.directory || panoIsUse(record)
        }),
    }

    const modelTitle = (materialType: UploadTypeEnum) => {
        const materialObj = {
            1: "图片素材库",
            2: "视频素材库",
            5: "全景素材库",
            6: "音频素材库",
            7: "PDF素材库",
            3: ""
        }
        return materialObj[materialType]
    }

    const showColumns = () => {
        const columns = [
            {
                title: '文件名称',
                dataIndex: 'url',
                render: (_: string, record: IMaterial) => (
                    <div className="flex flex-items-center cursor-pointer">
                        {
                            record.directory ? <img className="w-25" src={folder} /> :
                            loadPreviewUrl(record.fileId, materialType, record.url)
                        }
                        <span className="ml-5">{record.name}</span>
                    </div>
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
                ),
            },
            {
                title: '上传时间',
                dataIndex: 'updateTime',
            },
        ]
        if (materialType !== UploadTypeEnum.PANORAMA) columns.splice(1, 1)
        return columns
    }

    useEffect(() => {
        setRequestParams({ parentId: folderId })
    }, [folderId])

    useEffect(() => {
        if (materialType === UploadTypeEnum.AUDIO) setSelectionType('radio')
    }, [materialType])

    return <>
        <Modal title={modelTitle(materialType)} open={true} okText="确定" cancelText="取消" onCancel={() => setIsShow(false)} width={800} onOk={() => submitSelect(addTableData)}>
            <div className='flex justify-between'>
                <SearchInput
                    onFinish={(val) => setRequestParams({ ...val, current: 1 })}
                />
            </div>

            <CatalogueModel folderId={folderId} folderList={folderList} setShowFolder={setFolderId} setShowList={resetFolderList} />
            <Table
                rowKey="id"
                className='mt-20'
                rowSelection={{
                    type: selectionType,
                    ...rowSelections
                }}
                columns={showColumns()}
                dataSource={tableData.list}
                onRow={(record) => {
                    return {
                        onDoubleClick: () => {
                            if (!record.directory) return
                            onDoubleClickFolder(record)
                        },
                        onClick: () => {
                            if (record.directory) return
                            onClickSelectRow(record)
                        }
                    };
                }}
                pagination={{
                    pageSize: requestParams.size,
                    total: tableData?.total,
                    onChange: (current, size) => {
                        setRequestParams({ current, size })
                    }
                }}
                locale={{emptyText: '暂无数据'}}
                scroll={{y:400}}
            />
        </Modal>
    </>;
}