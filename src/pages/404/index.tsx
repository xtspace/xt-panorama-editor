
import s from './index.module.less'
import QR from './QR.jpg'

export function NotFound() {
    return <div className={s.box.c("flex-center")}>
        <img src={QR} alt="" width={300} height={300} />
    </div>;
}