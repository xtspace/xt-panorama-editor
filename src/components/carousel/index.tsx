import React from 'react';
import iconClose from "@/assets/close.png"
import { isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation } from 'swiper/modules';

import RcViewer from 'rc-viewer'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import s from './index.module.less';
import { loadAssets } from '@/utils/common';
import { IHotSpot } from '@/api/pano';
interface CarouselProps {
    imgList: IHotSpot[]
    currentData?: IHotSpot
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>
}

const M_TOP = 60
const M_BOTTOM = 60

export default function Carousel(props: CarouselProps) {
    const { setIsShow, imgList, currentData } = props
    const initialSlide = imgList?.findIndex(d => d?.id?.includes(currentData?.id || ''))


    const onLoad = (evt: React.MouseEvent<HTMLImageElement>) => {
        const target = evt.target as HTMLImageElement
        const nw = target.naturalWidth
        const nh = target.naturalHeight
        const ch = document.documentElement.clientHeight
        const cw = document.documentElement.clientWidth

        if (isMobile) {
            const wratio = cw / nw
            const h = nh * wratio >= ch ? ch - (M_TOP + M_BOTTOM) : nh * wratio
            target.style.height = h + 'px'
        } else {
            if (nh < ch - (M_TOP + M_BOTTOM)) {
                target.style.height = nh + 'px'
                target.style.width = '100%'
            } else {
                target.style.height = ch - (M_TOP + M_BOTTOM) + 'px'
            }
        }
        target.style.width = 'auto'
    }


    return <>
        <div className={s["carousel-mask"].c("flex-center")} >
            <div className={s["close-box"].c("flex-center")} onClick={() => setIsShow(false)}>
                <img src={iconClose} />
            </div>
            <Swiper
                initialSlide={initialSlide}
                navigation
                modules={[Virtual, Navigation]}
                virtual
                slidesPerView={1}
                style={{ height: '100vh' }}
            >
                {
                    imgList?.map((d, i) => <SwiperSlide key={i} virtualIndex={i}>
                        {
                            d.imgs?.length && d.imgs?.length > 1 ?
                            <div className={isMobile ? s['scroll-container'] : s['multiple-container']}>
                                {
                                    d.imgs?.map(img => {
                                        return <RcViewer key={img.id} ><img src={loadAssets(img.url)} /></RcViewer>
                                    })
                                }
                            </div> : 
                            <div className={s.container.c('flex flex-column flex-items-center')}>
                                <p className={s.title} >{d?.title}</p>
                                {
                                    d.imgs?.map(img => {
                                        return <RcViewer key={img.id} ><img src={loadAssets(img.url)} onLoad={onLoad} /></RcViewer>
                                    })
                                }
                            </div>
                        }
                    </SwiperSlide>)
                }
            </Swiper>
        </div >
    </>;
}