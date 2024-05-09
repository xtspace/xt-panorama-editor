import React, { useContext, useEffect, useRef, useState } from 'react';
import { Form, Select, Input, Button, Upload, Switch, UploadFile } from 'antd';
import { DeleteOutlined, UploadOutlined, CopyOutlined } from '@ant-design/icons'
import { hotspotList, iconList } from './config'
import s from './index.module.less'
import { formConfig, IFormConfig, FormItemTypeEnum } from './form-config';
import { UploadTypeEnum } from '@/enum/upload'
import { Context } from '../editor/context'
import { uploadFile, IFileInfo } from '@/api/upload'
import { produce } from 'immer';
import { CodeEnum } from '@/enum/code';
import { useSetState, useUpdateEffect } from 'ahooks';
import { uuid } from '@/utils/common';
import { IHotSpot } from '@/api/pano';
import { cloneDeep, concat, delay } from 'lodash-es';
import { IconTypeEnum } from '@/enum/hotspot';
import { getInitParams } from '@/utils/hotspot';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import update from 'immutability-helper';
import MaterialModel from "@/components/material-model";
import mark from "@/assets/mark.png"

const { TextArea } = Input

const { Option } = Select

const hotspotType: Record<string, UploadTypeEnum> = {
    'video': UploadTypeEnum.VIDEO,
    'img': UploadTypeEnum.IMAGE,
    'audio': UploadTypeEnum.AUDIO,
}


export default function EditorHotspot() {
    const [form] = Form.useForm()
    const ref = useRef<HTMLInputElement>(null)
    const iconUploadRef = useRef<HTMLInputElement>(null)
    const [isAdd, setIsAdd] = useState<boolean>(false)
    const [imgList, setImgList] = useState<IFileInfo[]>([])
    const [customIcon, setCustomIcon] = useState<IFileInfo>()
    const [videoList, setVideoList] = useState<UploadFile[]>([])
    const [audioList, setAudioList] = useState<UploadFile[]>([])

    const { curPano, panoData, krpanoRef, setPanoData } = useContext(Context)
    const krpano = krpanoRef.current?.getInstance();

    const sceneIdx = curPano?.id ? panoData?.scenes?.findIndex(d => d.id === curPano?.id) ?? 0 : 0
    let spotList = cloneDeep(panoData?.scenes[sceneIdx]?.hotspot ?? [])

    const [formValues, setFormValues] = useSetState<IHotSpot>(cloneDeep(getInitParams()))
    const [showMaterial, setShowMaterial] = useState<boolean>(false)
    const [materialType, setMaterialType] = useState(UploadTypeEnum.IMAGE)


    krpano?.registerDragObserver((data: IHotSpot) => {
        const { ath = 0, atv = 0 } = data.icon!
        const spot = spotList?.find(d => d.id === data?.id)
        setFormValues(produce((draft) => {
            draft.icon.ath = ath
            draft.icon.atv = atv
        }))
        if (!spot || !spot?.icon || !panoData) return
        spot.icon.ath = ath
        spot.icon.atv = atv
        const _panoData = cloneDeep(panoData)
        _panoData.scenes[sceneIdx].hotspot = spotList
        setPanoData?.(_panoData)
    })

    krpano?.registerClickObserver((id: string) => {
        const spot: IHotSpot | undefined = spotList.find(d => d.id === id)
        if (!spot) return
        setMaterialType(hotspotType[spot.type!])
        setFormValues(spot)
        setIsAdd(true)
        form.setFieldsValue(spot)
        setCustomIcon(spot?.icon?.url || spot?.icon?.url === '' ? { id: '', name: '', url: spot?.icon.url } : undefined)
    })


    useUpdateEffect(() => {
        krpano?.editorHotSpot(formValues)
    }, [formValues])

    
    useUpdateEffect(() => {
        const nowHotspot = spotList?.find(d => d.id === formValues?.id)
        setImgList(nowHotspot?.imgs ?? [])
        if (!nowHotspot) return
        setVideoList(filterMaterial(nowHotspot, 'videos'))
        setAudioList(filterMaterial(nowHotspot, 'audios'))
    }, [formValues.id])


    const filterMaterial = (spot: IHotSpot, key: string) => {
        const newFileList: UploadFile[] = []
        spot[key]?.map((d: IFileInfo) => {
            newFileList.push(d.response)
        })
        return newFileList
    }



    const onValuesChange = (value: any) => {
        setFormValues(value)
    }


    const onClickAddHotSpot = () => {
        setIsAdd(true)
        setCustomIcon(undefined)
        formValues.id = uuid(20)
        formValues.icon = {
            ...formValues.icon,
            ath: krpano.krpano?.get("view.hlookat"),
            atv: krpano.krpano?.get("view.vlookat"),
        }
        formValues.next = undefined
        krpano.create(formValues)
    }


    const onChangeUpload = async (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement
        const file = target?.files?.[0] as File;

        if (!file) return
        const formData = new FormData()
        formData.append("file", file)

        const fileInfo = await uploadFile(UploadTypeEnum.IMAGE, formData)
        setImgList(imgList.concat(fileInfo?.data?.result))
    }

    const uploadIcon = async (evt: React.ChangeEvent) => {
        const target = evt.target as HTMLInputElement
        const file = target?.files?.[0] as File;

        if (!file) return
        const formData = new FormData()
        formData.append("file", file)
        const fileInfo = await uploadFile(UploadTypeEnum.IMAGE, formData)
        setCustomIcon(fileInfo?.data?.result)
        setFormValues(produce(draft => {
            draft.icon.url = fileInfo?.data?.result.url
        }))
    }


    const customRequest = async (options: {
        file: File;
        onSuccess: (response: IFileInfo, file: File) => void;
    }) => {
        const formData = new FormData();
        formData.append("file", options.file)

        const fileInfo = await uploadFile(materialType, formData)
        if (fileInfo.data.code === CodeEnum.SUCCESS) {
            options.onSuccess(fileInfo?.data?.result, options.file)
        }
    }


    const onComplete = () => {
        const index = spotList.findIndex(d => d.id === formValues.id)
        const urlObj = {
            'text': '',
            'custom': customIcon?.url,
            'imgs': formValues.icon.url
        }
        Object.assign(formValues, {
            imgs: imgList.length ? imgList : [],
            videos: form.getFieldValue('videos') || [],
            audios: form.getFieldValue('audios') || [],
            icon: {
                ...formValues.icon,
                url: urlObj[formValues.iconType]
            }
        })

        index !== -1 ? (spotList[index] = formValues) : spotList.push(formValues)
        const _panoData = cloneDeep(panoData)
        _panoData && (_panoData.scenes[sceneIdx].hotspot = spotList, setPanoData?.(_panoData))

        handleReset()
        setIsAdd(false)
    }


    const handleReset = () => {
        krpano.resetHotSpot()
        form.resetFields()

        setFormValues(getInitParams())
    }


    const onClickHotSpot = (hotspot: IHotSpot) => {
        setIsAdd(true)
        setFormValues(hotspot)
        hotspot.type && setMaterialType(hotspotType[hotspot.type])
        form.setFieldsValue(hotspot)
        if (hotspot?.iconType === IconTypeEnum.CUSTOM && hotspot.icon.url) setCustomIcon({ id: '', name: '', url: hotspot.icon.url })
        krpano.setHotSpotBorder(hotspot)
        krpano.flyToCenter(hotspot.id)
        setImgList(spotList?.find(d => d.id === hotspot?.id)?.imgs ?? [])
    }



    const handleCopy = (event: React.MouseEvent, data: IHotSpot) => {
        event.stopPropagation()
        const _data = cloneDeep(data)
        const _panoData = cloneDeep(panoData)
        _data.id = uuid(20)
        _data.icon.ath = data.icon.ath + 10
        _data.icon.atv = data.icon.atv + 10
        spotList?.push(_data)
        _panoData && (_panoData.scenes[sceneIdx].hotspot = spotList, setPanoData?.(_panoData))


        krpano.create(_data)
        krpano.flyToCenter(_data.id)
    }

    const handleDelete = (event: React.MouseEvent, data: IHotSpot) => {
        event.stopPropagation()
        spotList?.splice(spotList.findIndex(f => f.id === data.id), 1)

        panoData && (panoData.scenes[sceneIdx].hotspot = spotList, setPanoData?.(cloneDeep(panoData)))
        krpano?.removeHotSpotGroup(data.id)
    }

    const changeIconType = (data: IconTypeEnum) => {
        const urlObj = {
            "imgs": iconList[0].url,
            "text": formValues.icon.url,
            "custom": customIcon?.url,
        }
        const values = {
            ...formValues,
            icon: {
                ...formValues.icon!,
                url: urlObj[data]
            },
            iconType: data
        }
        if (!values) return
        loadCustomUrl(values)
    }

    const loadCustomUrl = (values:IHotSpot) => {
        setFormValues(produce((draft) => {
            draft.icon = values.icon
            draft.iconType = values.iconType
        }))
        krpano.setHotSpotBorder(values)
        krpano.removeHotSpotGroup(values.id)
        delay(() => {
            krpano.createSpotGroup(values)
            krpano.hotspotMouse()
        }, 50)
    }

    useEffect(() => {
        setIsAdd(false)
    }, [curPano?.id])


    const renderFormItem = (data: IFormConfig) => {
        switch (data.type) {
            case FormItemTypeEnum.SELECT:
                return <Select placeholder={data.placeholder} fieldNames={data.fieldNames} options={data.getOptionData?.(panoData!)}></Select>
            case FormItemTypeEnum.IMGUPLOAD:
                return <div className={s["img-outerbox"]}>
                    <div className='mb-10 h-150 p-8 box-sizing'>
                        {
                            imgList?.map((d) => {
                                return <div key={d.id}>
                                    <img src={d.url} className='w-45 h-45 mr-7' />
                                    <DeleteOutlined
                                        className="absolute right-9 top-2 cursor-pointer"
                                        onClick={() => {
                                            setImgList(produce((draft) => {
                                                const index = draft.findIndex((f) => f.id === d.id)
                                                draft.splice(index, 1)
                                            }))
                                        }} />
                                </div>
                            })
                        }   
                    </div>
                    <div className='flex flex-justify-between'>
                        <Button onClick={() => setShowMaterial(true)} type='primary' size='small'>素材图片</Button>
                        <Button onClick={() => ref.current?.click()} type='primary' size='small' className='flex flex-items-end'>选择图片</Button>
                    </div>
                    <input ref={ref} type="file" className='!hidden' accept='image/*' onChange={onChangeUpload} />
                </div >
            case FormItemTypeEnum.TEXTAREA:
                return <TextArea placeholder={data.placeholder} showCount maxLength={100000} rows={8} />
            case FormItemTypeEnum.UPLOAD:
                return uploadBtn('视频', 'video/*', 10, videoList)
            case FormItemTypeEnum.AUDIOUPLOAD:
                return uploadBtn('音频', 'audio/*', 1, audioList)
        }
    }

    const uploadBtn = (name: string, accept: string, maxCount: number, fileList: UploadFile[]) => {
        return <Upload accept={accept} maxCount={maxCount} customRequest={customRequest as any} fileList={fileList}>
            <Button onClick={(event) => {
            event.stopPropagation()
            setShowMaterial(true)
            }} type='primary' className='mb-10' icon={<UploadOutlined />}>上传素材{name}</Button>
            <Button type="primary" icon={<UploadOutlined />}>上传本地{name}</Button>
        </Upload>
    }

    const onDroppableEnd = (result: any) => {
        if (!result.destination) return
        const activeData = spotList[result.source.index]
        const newSpotList = update(spotList, {$splice: [[result.source.index, 1], [result.destination.index, 0, activeData]]})
        spotList = newSpotList
        if (!panoData) return
        const _panoData = cloneDeep(panoData)
        _panoData.scenes[sceneIdx].hotspot = newSpotList
        setPanoData?.(_panoData)
    }

    const renderIconItem = (data: string) => {
        switch (data) {
            case IconTypeEnum.IMGS:
                return <Form.Item label="图片选择">
                    <div className="flex flex-wrap">
                        {
                            iconList?.map((d) => {
                                return React.Children.toArray(<div
                                    onClick={() => setFormValues({ icon: { ...formValues.icon!, url: d.url, oy: d.oy } })}
                                    className={s["icon-item"].c('w-44 h-44 ml-6 mb-6 overflow-hidden', {
                                        [s["active"]]: formValues.icon?.url === d.url
                                    })}>
                                    <img src={d.url} className='sprite-animation' />
                                </div>)
                            })
                        }
                    </div>
                </Form.Item>
            case IconTypeEnum.CUSTOM:
                return <Form.Item label="图片上传">
                    {
                        customIcon?.url && <div className='flex flex-justify-between flex-items-center mb-10'>
                            <img src={customIcon?.url} className='w-45 h-45 mr-7' />
                            <DeleteOutlined
                                className="cursor-pointer"
                                onClick={() => {
                                    const newValues = { ...formValues, icon: { ...formValues.icon!, url: undefined } }
                                    setCustomIcon(undefined)
                                    loadCustomUrl(newValues)
                                }} />
                        </div>
                    }
                    <Button onClick={() => iconUploadRef.current?.click()} type='primary' size='small'>选择图片</Button>
                    <input ref={iconUploadRef} type="file" className='!hidden' accept='image/*' onChange={uploadIcon} />
                </Form.Item>
            case IconTypeEnum.TEXT:
                return <Form.Item name="textType" label="标注类型">
                    <Select>
                        <Option value="line">直线</Option>
                        <Option value="arrow">三角形</Option>
                    </Select>
                </Form.Item>
        }
    }

    const addSelectData = (addTableData: any) => {
        const addList:any = []
        addTableData?.map((addItem: any) => {
            const id = uuid(20)
            addList.push(materialType === UploadTypeEnum.IMAGE ? {
                    id,
                    name: addItem.name,
                    url: addItem.url,
                    materialId: addItem.fileId
                }
                : {
                    name: addItem.name,
                    response: {
                        id,
                        name: addItem.name,
                        url: addItem.url,
                    }
                }
            )
        })
        switch(materialType) {
            case UploadTypeEnum.VIDEO:
                formValues.videos && form.setFieldsValue({
                    videos: concat(formValues.videos, addList)
                })
                break
            case UploadTypeEnum.IMAGE:
                setImgList(produce(imgList, draft => {
                    return concat(draft, addList)
                }))
                break
            case UploadTypeEnum.AUDIO:
                formValues.audios && form.setFieldsValue({
                    audios: addList
                })
                break
        }
        setShowMaterial(false)
    }

    const changeHotspotType = (type: string) => {
        setMaterialType(hotspotType[type])
    }


    return <>
        {!isAdd ? <>
            <Button type='primary' className='w-full mb-20' onClick={onClickAddHotSpot}>添加热点</Button>
            <div className={s["hotspot-outerbox"]}>
                <DragDropContext onDragEnd={onDroppableEnd}>
                    <Droppable droppableId="droppable-hotspot">
                        {(provided: any) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='w-full'
                        >
                            {
                                spotList?.map((d, i) => {
                                    return <Draggable key={d.id} draggableId={d.id} index={i}>
                                        {(provided: any) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                data-id={d.id}
                                                key={d.id}
                                                onClick={() => onClickHotSpot(d)}
                                                className={s["hotspot-item"].c("mb-8 pl-8 pr-8 flex justify-between flex-items-center")}
                                            >
                                                <div className='flex flex-items-center'>
                                                    <div style={{
                                                            backgroundImage: `url(${d.iconType === IconTypeEnum.TEXT ? mark : d.icon?.url})`,
                                                        }} className='w-16 h-16' />
                                                    <p className='ml-10'>{d.title}</p>
                                                </div>
                                                <div className='flex'>
                                                    <CopyOutlined className='mr-8' onClick={(event) => handleCopy(event, d)} />
                                                    <DeleteOutlined onClick={(event) => handleDelete(event, d)} />
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                })
                            }
                        </div>)}
                    </Droppable>
                </DragDropContext>
            </div>
        </> :
            <Form
                form={form}
                onValuesChange={onValuesChange}
                initialValues={getInitParams()}
            >
                <Form.Item name="type" label="热点类型">
                    <Select options={hotspotList} onChange={changeHotspotType}>
                    </Select>
                </Form.Item>
                <Form.Item name="iconType" label="图标设置">
                    <Select onChange={changeIconType}>
                        <Option value="imgs">系统图标</Option>
                        <Option value="text">文字标注</Option>
                        <Option value="custom">自定义上传</Option>
                    </Select>
                </Form.Item>
                {renderIconItem(form.getFieldValue('iconType'))}
                {
                    formConfig[formValues.type!]?.map((d) => React.Children.toArray(
                        <Form.Item name={d.name} label={d.label} valuePropName={d?.valuePropName}
                            getValueFromEvent={d?.getValueFromEvent}>
                            {renderFormItem(d)}
                        </Form.Item>
                    ))
                }
                <Form.Item label="标题设置" name="title">
                    <TextArea maxLength={500} showCount rows={4} />
                </Form.Item>

                <Form.Item label="显示标题" name={"showTitle"} valuePropName="checked">
                    <Switch />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8 }}>
                    <Button type="primary" htmlType='submit' onClick={onComplete}>完成设置</Button>
                </Form.Item>
            </Form>}
        {
            showMaterial && <MaterialModel setIsShow={setShowMaterial} materialType={materialType} submitSelect={addSelectData} />
        }
    </>
}

