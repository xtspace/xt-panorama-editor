import s from './index.module.less';
import iconClose from "@/assets/close.png"
import { isMobile } from 'react-device-detect';
import VideoModel from '@/components/video-model'
import { loadAssets } from '@/utils/common';

interface IProps {
    videoList: any[] 
    setIsShow: (v: boolean) => void
}

export default function VideoBox(props: IProps) {
    const { setIsShow, videoList } = props

    return <div className={s["video-box"]}>
        <div className={s["close-box"].c("flex-center")} onClick={() => setIsShow(false)}>
            <img src={iconClose} />
        </div>
        {
            videoList.length > 1 ? <div className={isMobile ? s['scroll-video'] : s['multiple-video']}>
            {
                videoList.map((videoItem: any) => {
                    return <div key={videoItem.response.id}>
                        <video src={loadAssets(videoItem.response.url)} autoPlay={false} className='w-full h-95%' controls />
                        <span className='c-white text-center'>{videoItem.response.name}</span>
                    </div>
                })
            }
            </div> : videoList.length > 0 ? <VideoModel url={videoList[0].response.url} setIsShow={() => {}} /> : <></>
        }
    </div>
}
