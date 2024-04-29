
import iconClose from "@/assets/close.png"
import s from './index.module.less';
import { isMobile } from 'react-device-detect';
import { loadAssets } from "@/utils/common";

interface IProps {
    url: string
    setIsShow: (v: boolean) => void
}

export default function AudioModel(props: IProps) {
    const { setIsShow, url } = props

    return <div className={s["audio-model"]}>
        <div className={s["close-box"].c("flex-center")} onClick={() => setIsShow(false)}>
            <img src={iconClose} />
        </div>
        <div className="flex items-center h-full w-full flex-justify-center">
            <audio src={loadAssets(url)} autoPlay controls className={isMobile ? 'w-90%' : 'w-30%'} />
        </div>
    </div>
}
