import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLongPress, usePrevious, useTimeout, useToggle, useUnmount } from 'ahooks';
import { delay, union } from 'lodash-es';
import { SceneContext } from './index'
import Tool from './tool';
import switchBtn from '@/assets/pano.png'
import success from '@/assets/success.png'
import s from './index.module.less';
import Carousel from '@/components/carousel';
import TextModel from '@/components/text-model';
import { IHotSpot, IPanoSceneData } from '@/api/pano';
import { CategoryEnum } from '@/mock/data';
import {
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';
import VideoBox from '@/components/video-box';
import AudioModel from '@/components/audio-model';

export default function SceneSwitch() {
    const { container, krpano, panoData, setCurPano } = useContext(SceneContext);

    const menuRef = useRef<HTMLDivElement>(null)
    const menuListRef = useRef<HTMLDivElement>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isShow, { toggle }] = useToggle(true);
    const [isShowBorder, { toggle: toggleBorder, setRight, setLeft }] = useToggle(true);
    const [cacheData, setCacheData] = useState<string[]>([]);
    const [isCarousel, setIsCarousel] = useState<boolean>(false);
    const [imgList, setimgList] = useState([])
    const [currentHotspot, setCurrentHotspot] = useState<IHotSpot>()
    const [isTextShow, setIsTextShow] = useState<boolean>(false);
    const [isVideoShow, setIsVideoShow] = useState<boolean>(false);
    const [isAudioShow, setIsAudioShow] = useState<boolean>(false);
    const [curScene, setCurScene] = useState<string>('');
    const [showArrowhead, setArrowhead] = useState<boolean>(false)
    const [scrollNum, setScrollNum] = useState<number>(0)

    const previous = usePrevious(cacheData)

    const xmlScene = krpano?.krpano?.get?.("xml.scene")
    const sceneName = xmlScene?.replace("scene", "") ?? panoData?.scenes[0]?.id
    krpano?.setDrag(false)


    useTimeout(() => {
        if (menuRef.current && menuListRef.current) {
            const width = menuRef.current?.getBoundingClientRect().width
            const listWidth = menuListRef.current?.getBoundingClientRect().width
            setScrollNum(Math.floor(width / 99))
            if (listWidth > width) {
                menuRef.current.classList.add("flex-justify-start")
            } else {
                menuRef.current.classList.add("flex-justify-center")
            }
            setArrowhead(listWidth > width)
        }
    }, 4100)


    useEffect(() => {
        if (!panoData?.scenes) return
        delay(() => {
            onClickScene(panoData.scenes[0])
            krpano?.krpano?.call('skin_setup_littleplanetintro()')
        }, 0)
    }, [panoData])



    useEffect(() => {
        panoData?.scenes && setCurPano?.(panoData.scenes.find(d => d.id === sceneName)!)
        sceneName && initLoad(), setCurScene(sceneName)
    }, [sceneName, panoData?.scenes])


    const clear = useTimeout(() => {
        setIsLoading(true);
    }, 4000);


    useUnmount(() => {
        clear()
    })


    const initLoad = () => {
        delay(() => {
            const imgList = krpano?.getHotspotList((d: any) => d._type === CategoryEnum.IMG && !d.name.includes("title"))
            setimgList(imgList);

            const eventType = [
                {
                    type: CategoryEnum.IMG,
                    event: () => setIsCarousel(true)
                },
                {
                    type: CategoryEnum.TEXT,
                    event: () => delay(() => setIsTextShow(true), 100)
                },
                {
                    type: CategoryEnum.VIDEO,
                    event: () => setIsVideoShow(true)
                },
                {
                    type: CategoryEnum.AUDIO,
                    event: () => setIsAudioShow(true)
                },
            ]

            eventType.map(typeItem => {
                krpano?.addEventListener(typeItem.type, (d: any) => {
                    setCurrentHotspot(d)
                    typeItem.event()
                })
            })
        }, 400)

    }


    useLongPress(() => { }, container, {
        delay: 180,
        onClick: () => {
            toggle()
            setIsTextShow(false)
            isShow ? setRight() : setLeft()
        }
    })


    const onClickScene = (data: IPanoSceneData) => {
        if (curScene === data.id) return;
        setCurScene(data.id)
        krpano?.krpano?.call(krpano.loadScene(data.id))
        setCacheData(prev => union([...prev, data.id]))
    }

    const shiftCurScene = (type: boolean) => {
        if (!menuRef.current) return
        if (!type && menuRef.current.scrollLeft === 0) return
        menuRef.current.scrollLeft += type ? scrollNum * 99 : -scrollNum * 99
    }

    useTimeout(() => {
        setIsLoading(true);
    }, 4000)


    return (
        <>
            {isLoading && <>{isShow && <>
                <div className={s["preview-num"]}>{panoData?.count}人来过</div>
                <div className={"flex flex-col flex-items-center".c(s["action-btn"])} onClick={toggleBorder}>
                    <img src={switchBtn} />
                    <div className={"mt-5".c({ [s.border]: isShowBorder })}>场景选择</div>
                </div></>}

                <div className={s["image-menu"].c({ [s["menu-show"]]: isShowBorder ?? isShow })} >
                    {
                        showArrowhead &&
                        <div className='flex flex-items-center'>
                            <LeftOutlined className="font-size-40 c-white cursor-pointer" onClick={() => shiftCurScene(false)} />
                        </div>
                    }
                    <div className={s["image-menu-bg"]} ref={menuRef}>
                        <div className={s["image-menu-list"]} ref={menuListRef}>
                            {
                                panoData?.scenes.map((d: IPanoSceneData) => React.Children.toArray(
                                    <div className={s["item"].c({
                                        [s.active]: sceneName === d.id
                                    })} onClick={() => onClickScene(d)}>
                                        <img src={'.' + d.pano.thumbUrl} />
                                        {
                                            <div className={s["success-box"].c({
                                                [s.show]: previous?.find(id => id === d.id)
                                            })}>
                                                <img src={success} />
                                            </div>
                                        }
                                        <div>{d.pano.name}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {
                        showArrowhead &&
                        <div className='flex flex-items-center'>
                            <RightOutlined className="font-size-40 c-white cursor-pointer" onClick={() => shiftCurScene(true)} />
                        </div>
                    }
                </div>

                {isShow && <Tool />}
                {isCarousel && <Carousel setIsShow={setIsCarousel} imgList={imgList} currentData={currentHotspot} />}
                {isTextShow && <TextModel setIsShow={setIsTextShow} content={currentHotspot?.content || ''} />}
                {isVideoShow && <VideoBox setIsShow={setIsVideoShow} videoList={currentHotspot?.videos || []} />}
                {isAudioShow && <AudioModel setIsShow={setIsAudioShow} url={currentHotspot?.audios && currentHotspot?.audios[0].response.url} />}
                </>
            }
        </>
    );
}