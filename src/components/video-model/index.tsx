
import iconClose from "@/assets/close.png"
import s from './index.module.less';
import { useEventListener } from "ahooks";
import Artplayer from 'artplayer';
import { useEffect, useRef, useState } from "react";
import { loadAssets } from "@/utils/common";

interface IProps {
    url: string
    setIsShow: (v: boolean) => void
}

export default function VideoModel(props: IProps) {
    const { setIsShow, url } = props
    const ref = useRef<HTMLDivElement>(null)
    const [art, setArt] = useState<Artplayer>()


    useEventListener('click', (evt) => {
        if (ref.current === evt.target) {
            setIsShow(false)
        }
    }, { target: ref.current })


    useEffect(() => {
        if (!art) {
            const newArt = new Artplayer({
                container: `.artplayer`,
                url: loadAssets(url),
                autoplay: false,
                muted: true
            });
            setArt(newArt);
        }

    }, [art]);


    return <div className={s["video-model"]} ref={ref}>
        <div className={s["close-box"].c("flex-center")} onClick={() => setIsShow(false)}>
            <img src={iconClose} />
        </div>

        <div className={`artplayer`} ></div>
    </div>
}
