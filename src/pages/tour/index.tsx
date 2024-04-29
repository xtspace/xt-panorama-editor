import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Table, message, Modal, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import copy from "copy-to-clipboard";
import SearchInput from '@/components/search-input';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';
import { deletePano, getPanoList, IPanoData } from '@/api/pano';
import { useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import { CodeEnum } from '@/enum/code';
import { MenuEnum } from '../editor/menu.config';
import { generateCore } from '@/generator';
import { panoStore } from '@/utils/pano-store';
import { generateProjectZip } from '@/generator/download/zip';
import QRCode from 'qrcode.react';

interface PageData{
    total:number
    size:number
    current:number
}
export default function Tour() {

    const navigate = useNavigate();
    const [panoList, setPanoList] = useState<IPanoData["records"]>([]);
    const [confirmModal, setConfirmModal] = useState(false);
    const [shareModal, setShareModal] = useState(false);
    const [shareUrl, setShareUrl] = useState('');
    const [delPano, setDelPano] = useState<{
        id: string;
        title: string;
    }>();
    const saveRef = useRef<HTMLAnchorElement>(null);
    const [downloadId, setDownloadId] = useState<{ id:string, state:string }[]>([]);
    const [pageData, setPageData] =useState<PageData>({
        total: 0,
        size: 8,
        current: 1,
    });
    const [searchInput, setSearchInput] =useState('');

    const { run } = useRequest(getPanoList, {
        defaultParams: [{
            size: 8,
            current: 1,
            keyword: ''
        }],
        onSuccess: (data) => {
            setPanoList(data?.data?.result?.records || []);
            setPageData({
                total: data?.data?.result?.total,
                size: data?.data?.result?.size,
                current: data?.data?.result?.current,
            })
        }
    });



    const handleDelete = async (id: string) => {
        const res = await deletePano(id);
        res.data.code === CodeEnum.SUCCESS ?
            setPanoList(produce(panoList, draft => {
                return draft.filter(d => d.id !== id);
            })) : message.error("删除失败");
        setConfirmModal(false)
        run({
            size: 8,
            current: 1,
            keyword: searchInput
        })
    };

    const confirmDel = () => {
        if (!delPano) return
        handleDelete(delPano.id)
    }

    const changeCanvasToPic = () => {
        const canvasImg: any = document.getElementById('qrCode');
        const img = new Image();
        img.src = canvasImg?.toDataURL('image/png');
        if (!saveRef.current) return
        saveRef.current.href = canvasImg?.toDataURL('image/png');
        saveRef.current.download = '二维码';
    };

    const controlState = (id: string, state: string) => {
        downloadId.map(d => {
            if (d.id === id) {
                d.state = state
                return
            }
        })
        setDownloadId([...downloadId])
    }
    
    useEffect(() => {
        const list:{ id:string, state:string }[] = []
        panoList.map(panoItem => {
            if (!downloadId.find(d => panoItem.id === d.id)) {
                list.push({ id: panoItem.id, state: '离线下载' })
            }
        })
        setDownloadId([...downloadId, ...list])
    }, [panoList])

    const columns: ColumnsType<IPanoData["records"][0]> = [
        {
            title: '全景名称',
            dataIndex: 'title',
            width: "80%",
            render: (text: string, record) => (
                <div className='flex flex-items-center'>
                    <img width={50} height={50} src={`${record?.thumbUrl}`} />
                    <div className='flex flex-col ml-10'>
                        <Link to={`/preview/${record.id}`} target='_blank'>{text}</Link>
                        <div className='c-neutral-500 font-size-12'>
                            <span>修改:{record.updateTime}</span>
                            <EyeOutlined className='ml-10' />
                            <span className='ml-5'>{record.count}</span>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: '操作',
            dataIndex: 'action',
            width: "20%",
            render: (_: string, record) => (
                <>
                    <Link to={{ pathname: `/editor/basic/${record.id}` }} target='_blank' state={MenuEnum.BASIC}>编辑</Link>
                    <a className='ml-10 cursor-pointer' onClick={() => {
                        setDelPano(record)
                        setConfirmModal(true)
                    }}>删除</a>
                    <a className='ml-10 cursor-pointer' onClick={() => {
                        setShareUrl(`${location.origin}/#/preview/${record.id}`)
                        setShareModal(true)
                    }}>分享链接</a>
                    {
                        <a className='ml-10 cursor-pointer' onClick={async () => {
                            if (downloadId?.find(d => d.id === record.id)?.state === '下载中') return
                            controlState(record.id, '下载中')
                            const data = await panoStore.requestData(record.id);
                            const files = await generateCore(data, record.id);
                            controlState(record.id, '离线下载')
                            if (!files) return message.error(record.title + '下载失败')
                            await generateProjectZip(files);
                        }}>{ downloadId?.find(d => d.id === record.id)?.state }</a>
                    }
                </>
            ),
        }
    ];

    return (
        <>
            <div className='flex justify-between'>
                <SearchInput
                    onFinish={(val) => {
                        setSearchInput(val.keyword)
                        run({ current: pageData?.current, size: pageData?.size, keyword: val.keyword })
                    }}
                />
                <Button type='primary' onClick={() => navigate('/task')}>
                    <PlusOutlined />创建作品
                </Button>
            </div>

            <Table
                rowKey="id"
                className='mt-20'
                columns={columns}
                dataSource={panoList}
                locale={{ emptyText: '暂无数据' }}
                pagination={{
                    pageSize: pageData?.size,
                    total: pageData?.total,
                    onChange: (current, size) => {
                        run({ ...pageData, keyword: searchInput, current, size  })
                    }
                }}
            />
            <Modal title="确认删除" open={confirmModal} onOk={confirmDel} onCancel={() => setConfirmModal(false)} okText="确认" cancelText="取消">
                <p>确定要删除作品{delPano?.title}吗？</p>
            </Modal>
            <Modal title="分享链接" open={shareModal} onCancel={() => setShareModal(false)} footer={null}>
                <Space.Compact style={{ width: '100%' }}>
                    <Input defaultValue={shareUrl} disabled />
                    <Button onClick={() => {
                        copy(shareUrl)
                        message.success("复制成功");
                    }}>复制</Button>
                </Space.Compact>
                <div className='flex flex-col flex-items-center'>
                    <QRCode
                        id="qrCode"
                        value={shareUrl}
                        size={200} // 二维码的大小
                        fgColor="#000000" // 二维码的颜色
                        className='ma my-20'
                    />
                    <a ref={saveRef} onClick={changeCanvasToPic}>
                        保存二维码
                    </a>
                </div>
            </Modal>
        </>
    );
}
