import IconClose from '@/assets/close.png';
import s from './index.module.less';

interface IProps {
    title?: string
    classname?: string
    content: string
    setIsShow: (v: boolean) => void
}
export default function TextModel(props: IProps) {
    const { title, content, setIsShow, classname } = props


    return <>
        <div className={s["text-model"].c(classname)}>
            <div className={s.header.c("flex justify-between flex-items-center")}>
                <p>{title}</p>
                <img src={IconClose} alt="" onClick={() => setIsShow(false)} />
            </div>
            <div className={s.content}>
                <div>
                    {content}
                </div>
            </div>
        </div>
    </>;
}