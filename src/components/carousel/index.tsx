import React from 'react';
import iconClose from "@/assets/close.png"
import { isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation } from 'swiper/modules';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

// import RcViewer from 'rc-viewer'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import s from './index.module.less';
import { loadAssets } from '@/utils/common';
import { IHotSpot } from '@/api/pano';
import { IFileInfo } from '@/api/upload';
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

    const showContentHtml = (img: IFileInfo) => {
        return <div className='c-#fff position-absolute bottom-0 h-20vh w-full flex justify-center z-10'>
            <div
                className='h-full whitespace-pre-line break-words overflow-y-scroll'
                style={{ 'textAlign': img?.alignType, 'width': isMobile ? '100%': '30%', 'scrollbarWidth': 'none' }}
            >
                {img.content}
            </div>
        </div>
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
                                <p className='c-#fff pos-absolute w-full left-0 top-4 text-center'>{d?.title}</p>
                                {
                                    d.imgs?.map(img => {
                                        return <PhotoProvider
                                                key={img.id}
                                                maskOpacity={0.5}
                                                bannerVisible={false}
                                                overlayRender={() => {
                                                    return (
                                                        showContentHtml(img)
                                                    );
                                                }}
                                        >
                                            <PhotoView src={loadAssets(img.url)}>
                                                <img src={loadAssets(img.url)} />
                                            </PhotoView>
                                        </PhotoProvider>
                                    })
                                }
                            </div> : 
                            <div className={s.container.c('flex flex-column flex-items-center')}>
                                <p className={s.title} >{d?.title}</p>
                                {
                                    d.imgs?.map(img => {
                                        return <div key={img.id}>
                                            <PhotoProvider
                                                maskOpacity={0.5}
                                                bannerVisible={false}
                                            >
                                                <PhotoView src={loadAssets(img.url)}>
                                                    <img src={loadAssets(img.url)} onLoad={onLoad} />
                                                </PhotoView>
                                            </PhotoProvider>
                                            <div className='pos-absolute w-100vw bottom-0 left-0 h-20vh'>{ showContentHtml(img) }</div>
                                        </div>
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