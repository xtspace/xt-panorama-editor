import { useContext } from 'react';
import Info from '@/assets/info.png';
import { SceneContext } from './index'
import { useBoolean, useEventListener } from 'ahooks';
import TextModel from '@/components/text-model';
import s from './index.module.less';


export default function Tool() {
    const { container, panoData } = useContext(SceneContext);
    const [isShow, { setTrue, setFalse }] = useBoolean(false)

    useEventListener('click', setFalse, { target: container })

    return (
        <>
            <div className={s["action-btn"].c(s["intro-box"], 'flex flex-col flex-items-center')} onClick={setTrue}>
                <img src={Info} />
                <span>简介</span>
            </div>
            {isShow && <TextModel
                classname={s["intro-model"]}
                setIsShow={setFalse}
                title={panoData?.title}
                content={panoData?.profile ?? ""} />

            }</>
    );
}