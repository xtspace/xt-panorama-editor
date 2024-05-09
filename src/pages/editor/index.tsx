import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { Button, Dropdown, Modal, type MenuProps, Form, Input, message, Checkbox } from 'antd';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined, SaveOutlined, FundViewOutlined, DashOutlined } from '@ant-design/icons'
import { MenuEnum, menus } from './menu.config'
import frame from "@/assets/frame.png"
import Preview from '../preview'
import s from './index.module.less';
import { useSetState } from 'ahooks';
import { IPanoSceneData, updatePano, IPanoItem, panoStart, IHotSpot } from '@/api/pano';
import { Context } from './context';
import { Krpano } from '@/utils/krpano-util';
import { cloneDeep, cond, matches, delay } from 'lodash-es';
import { UploadPano } from '@/components/upload-pano';
import { getSceneInitConfig } from '@/utils/hotspot';
import { CodeEnum } from '@/enum/code';
import { panoStore } from '@/utils/pano-store';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import { HotspotTypeEnum } from '@/pages/editor-hotspot/config';
import { UploadTypeEnum } from '@/enum/upload';
import { addMaterialListApi, IAddMaterialData } from '@/api/material'
import { IFileInfo } from '@/api/upload';

const actionItems: MenuProps['items'] = [
    {
        key: 'rename',
        label: "重命名",
    },
    {
        key: 'delete',
        label: "删除",
    }
];


const setPanoData = panoStore.setPanoData
const getPanoData = panoStore.getSnapshot

export default function Editor() {
    const [form] = Form.useForm()


    const { fileId } = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const krpanoRef = useRef<any>(null)
    const viewRef = useRef<any>(null)

    const [curPano, setCurPano] = useState<IPanoSceneData>()
    const [curActionPano, setCurActionPano] = useState<IPanoSceneData>()
    const [isRename, setIsRename] = useState<boolean>(false)

    const [pregress, setPregress] = useSetState<{ percent: number, uid: string }>({ uid: "", percent: 0 })

    const krpano: Krpano = krpanoRef.current?.getInstance()


    const panoData = useSyncExternalStore(panoStore.subscribe, panoStore.getSnapshot)

    const renameRef = useRef<HTMLInputElement>(null);

    const [confirmModal, setConfirmModal] = useState<boolean>(false);

    const [delScene, setDelScene] = useState<IPanoSceneData>();


    useEffect(() => {
        const state = location.state ?? MenuEnum.BASIC
        if (location.state === MenuEnum.HOTSPOT) isInitHotspot()
        krpano && krpano?.setHotSpotVisible(state === MenuEnum.HOTSPOT ? true : false)
    }, [location.state, krpano, curPano?.id])



    const isInitHotspot = () => {
        const curPanoId = curPano?.id || panoData?.scenes[0].id
        const hotspot = panoData?.scenes?.find(d => d.id === curPanoId)?.hotspot
        if (hotspot?.length && !krpano?.getHotspotList().find((h:any) => h.name.includes(hotspot[0]?.id))) krpano?.init(hotspot!)
    }



    const onClickDefaultView = () => {
        const fov = krpano.krpano.get("view.fov");
        const hlookAt = krpano.krpano.get("view.hlookAt");
        const vlookAt = krpano.krpano.get("view.vlookAt");
        viewRef.current.editorScene({ fov, hlookAt, vlookAt })
    }


    const onClickSave = async () => {
        if (fileId && panoData) {
            const newMaterials: string[] = []
            const _panoData = cloneDeep(panoData)
            _panoData?.scenes.map((sceneItem) => {
                sceneItem.hotspot.map((hotspotItem: any) => {
                    ['img', 'video', 'audio'].includes(hotspotItem.type) && hotspotItem[hotspotItem.type + 's'].map((item:IFileInfo) => {
                        newMaterials.push(hotspotItem.type === HotspotTypeEnum.IMG ? item?.materialId || item.id : item.response.id)
                    })
                    if (hotspotItem?.icon.url) {
                        !hotspotItem?.icon.url.includes('assets/') && newMaterials.push(hotspotItem?.icon.url.match(/.*\/(.*?)\./)?.[1])
                    }
                })
            })
            _panoData.materials = newMaterials
            const res = await updatePano(fileId, _panoData)
            const addList: IAddMaterialData[] = []
            _panoData?.scenes.map(panoItem => {
                panoItem.pano && addList.push({
                    fileId: panoItem.pano.fileId,
                    name: panoItem.pano.name,
                    type: UploadTypeEnum.PANORAMA
                })
            })
            await addMaterialListApi({ list: addList, panoName: _panoData.title })
            setPanoData(_panoData)
            res.data.code === CodeEnum.SUCCESS ? message.success("保存成功") : message.error("保存失败")
        }
    }


    const onClickActionItem = ({ key }: { key: string }, data: IPanoSceneData) => {
        setCurActionPano(data)
        const func = cond([
            [matches("delete"), () => {
                setConfirmModal(true)
                setDelScene(data)
            }],
            [matches("rename"), () => {
                form.setFieldsValue({
                    name: data?.pano?.name,
                    editName: true
                })
                setIsRename(true)
                delay(() => {
                    renameRef?.current && renameRef.current.select();
                }, 100)
            }],
        ])
        func(key)
    }

    const deleteScene = () => {
        if (!delScene) return
        const index = panoData?.scenes?.findIndex(d => d.id === delScene.id) ?? -1
        panoData?.scenes?.splice(index, 1)
        setConfirmModal(false)
    }


    const handleRename = () => {
        const _panoData = cloneDeep(panoData)
        form.getFieldValue("editName") && _panoData?.scenes.map((sceneItem: IPanoSceneData) => {
            sceneItem?.hotspot.map((hotspotItem: IHotSpot) => {
                if (hotspotItem?.type === 'link' && hotspotItem?.title && curActionPano?.id === hotspotItem.next) {
                    hotspotItem.title = form.getFieldValue("name")
                    krpano?.editorHotSpot(hotspotItem)
                }
            })
        })
        const index = _panoData?.scenes?.findIndex(d => d.id === curActionPano?.id) ?? -1
        _panoData.scenes[index].pano && (_panoData.scenes[index].pano.name = form.getFieldValue("name"))
        setPanoData(_panoData)

        setIsRename(false)
        form.resetFields()
    }


    const onSucessUpload = (data: IPanoItem) => {
        panoStart(data.fileId).then((res) => {
            const _panoData = cloneDeep(getPanoData())
            _panoData?.scenes.forEach(d => {
                if (res.data.result.uid === d.pano?.uid) {
                    d.id = res.data.result.fileId
                    d.pano = res.data.result
                }
            })
            setPanoData(_panoData)
        })
    }


    const onLoadUpload = (data: IPanoItem) => {
        panoData?.scenes.push({
            ...getSceneInitConfig(""),
            pano: data
        })
    }

    const onDragEnd = (result: any) => {
        if (!result.destination) return
        const activeData = panoData.scenes[result.source.index]
        const initShowScene = panoData.scenes[0]
        const newPanoData = update(panoData, {scenes:{$splice: [[result.source.index, 1], [result.destination.index, 0, activeData]]}})
        setPanoData(newPanoData)
        !curPano?.pano?.fileId && setCurPano(initShowScene)
    }

    return <>
        <div className={s["editor-page"].c("reset-antd flex flex-col bg-black px-10 pt-15 pb-10 text-white")}>
            <div className={"relative flex justify-between h-30 items-center"}>
                <div className={s["left"].c("flex")} onClick={() => navigate("/tour")}>
                    <LeftOutlined />
                    <span>返回</span>
                </div>
                <div>
                    <Button type='primary' onClick={onClickSave}><SaveOutlined />保存</Button>
                    <Link to={`/preview/${fileId}`} target='_blank'><Button type='primary' className='ml-10'>
                        <FundViewOutlined />预览</Button>
                    </Link>
                </div>
            </div>
            <div className='mt-15 flex flex-1'>
                <div className="w-40 text-center">
                    {
                        menus?.map(m => {
                            return <div key={m.link} className={s["item"].c("mt-4", {
                                [s["active"]]: m.type === (location.state ?? MenuEnum.BASIC)
                            })} onClick={() => {
                                navigate(`${m.link}/${fileId}`, { state: m.type })
                            }}>
                                <img src={m.icon} />
                                <span >{m.name}</span>
                            </div>
                        })
                    }
                </div>
                <div className={s["content"].c("flex-1 ml-10 mr-10")}>
                    <div className={s["top"].c("flex-center")}>
                        <Context.Provider value={{ krpanoRef }}>
                            <Preview ref={krpanoRef} />
                        </Context.Provider>

                        {location.state === MenuEnum.VIEW && <div className={s["view-frame"].c("flex flex-col flex-items-center")}>
                            <img src={frame} />
                            <Button type='primary' onClick={onClickDefaultView}>把当前视角设置为初始视角</Button>
                        </div>}
                    </div>
                    <div className={s["bottom"].c("mt-10 flex flex-col justify-center")}>
                        <div className="flex justify-between">
                            <span>场景列表</span>
                            <UploadPano<any> id={fileId!} onload={onLoadUpload}
                                onpregress={setPregress}
                                onSucess={onSucessUpload}
                                btnText='从本地文件添加'
                                taskUpload={() => {}}
                            />
                        </div>
                        <div className='mt-16'>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided: any) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className='w-full flex'
                                    >
                                        {
                                            panoData?.scenes?.map((d, i) => {
                                                return <Draggable key={d.pano?.uid} draggableId={d.pano?.uid} index={i}>
                                                    {(provided: any) => (
                                                        <div className='relative' {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                            <div className={s["action-box"].c('absolute z-1 right-0 top-6 h-16 flex-center cursor-pointer')}>
                                                                <Dropdown trigger={['click']} menu={{ items: actionItems, onClick: (val) => onClickActionItem(val, d) }} placement="topLeft" >
                                                                    <DashOutlined />
                                                                </Dropdown>
                                                            </div>
                                                            <div key={d.id} className={s["scene-item"].c("ml-8", {
                                                                [s["active"]]: (curPano?.pano?.fileId ?? panoData?.scenes[0]?.pano?.fileId) === d?.pano?.fileId
                                                            })} onClick={() => {
                                                                setCurPano(d)
                                                                krpanoRef.current.loadHotspot(d)
                                                            }}>
                                                                {d?.pano?.thumbUrl ? <img src={d.pano.thumbUrl} /> : <div className={s["pregress-box"]}>
                                                                    {pregress.uid === d.pano?.uid ? (pregress.percent !== 100 ? pregress.percent + '%' : "制作中") : "制作中"}
                                                                </div>}
                                                                <div title={d.pano?.name} className="truncate">{d.pano?.name}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            })
                                        }
                                    </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                </div>
                <div className={s["config-panel"]}>
                    <Context.Provider value={{ panoData, curPano, krpanoRef, viewRef, setPanoData }}>
                        <Outlet />
                    </Context.Provider>
                </div>
            </div>
        </div >
        <Modal title="场景重命名" open={isRename} okText="确认" cancelText="取消" onCancel={() => setIsRename(false)} onOk={handleRename}>
            <Form
                name="basic"
                form={form}
                onKeyDown={e => {
                    e.key.toLowerCase() === 'enter' && handleRename()
                }}
            >
                <Form.Item label="全景名称" name="name">
                    <Input ref={renameRef} />
                </Form.Item>
                <Form.Item name="editName" valuePropName="checked">
                    <Checkbox>同时修改“场景切换”热点标题</Checkbox>
                </Form.Item>
            </Form>
        </Modal >
        <Modal title="确认删除场景" open={confirmModal} onOk={deleteScene} onCancel={() => setConfirmModal(false)} okText="确认" cancelText="取消">
            <p>{delScene?.pano?.name}场景下所有设置也都将会被删除，确认删除？</p>
        </Modal>
    </>
}
