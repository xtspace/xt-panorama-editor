import { PlusOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Table, message, Modal, Space, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import copy from "copy-to-clipboard";
import SearchInput from '@/components/search-input';
import { Link, useNavigate } from 'react-router-dom';
import { deletePano, IPanoData } from '@/api/pano';
import { useRef, useState, useSyncExternalStore } from 'react';
import { CodeEnum } from '@/enum/code';
import { MenuEnum } from '../editor/menu.config';
import { generateCore } from '@/generator';
import { panoStore } from '@/utils/pano-store';
import { generateProjectZip } from '@/generator/download/zip';
import QRCode from 'qrcode.react';
import usePano from '@/hooks/usePano';
import { offlineStore } from '@/utils/offline-store';



export default function Tour() {
    const navigate = useNavigate();
    const [tableData, , requestParams, setRequestParams] = usePano()
    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    const [shareModal, setShareModal] = useState<boolean>(false);
    const [shareUrl, setShareUrl] = useState<string>('');
    const [delPano, setDelPano] = useState<{
        id: string;
        title: string;
    }>();
    const saveRef = useRef<HTMLAnchorElement>(null);
    const offlineData = useSyncExternalStore(offlineStore.subscribe, () => offlineStore.getOfflineData())





    const handleDelete = async (id: string) => {
        const res = await deletePano(id);
        res.data.code !== CodeEnum.SUCCESS && message.error("删除失败");
        setConfirmModal(false)
        setRequestParams(requestParams)
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
                </>
            ),
        }
    ];

    return (
        <>
            <div className='flex justify-between'>
                <SearchInput
                    onFinish={(val) => {
                        setRequestParams({ ...val })
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
                dataSource={tableData.list}
                locale={{ emptyText: '暂无数据' }}
                pagination={{
                    pageSize: requestParams.size,
                    current: requestParams.current,
                    total: tableData.total,
                    onChange: (current, size) => {
                        setRequestParams({ current, size })
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
