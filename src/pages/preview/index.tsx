import { forwardRef, useRef, useContext, useEffect, useImperativeHandle, createContext, MutableRefObject, useSyncExternalStore, useState } from 'react'
import { useAsyncEffect, useMount } from 'ahooks'
import { Krpano } from '@/utils/krpano-util'
import SceneSwitch from './scene-switch'
import { useParams } from 'react-router-dom';
import { Context } from '@/pages/editor/context'
import { IPanoDetailData, IPanoSceneData, updateCount } from '@/api/pano';
import { panoStore } from '@/utils/pano-store';
import { delay } from 'lodash-es';
import { EnvEnum, panoSubject } from '@/utils/pano-player'
import { message } from 'antd';



export const SceneContext = createContext<{
    container?: MutableRefObject<HTMLDivElement | null>
    krpano?: any
    curPano?: IPanoSceneData
    panoData?: IPanoDetailData
    setCurPano?: (data: IPanoSceneData) => void
}>({});


const Preview = forwardRef(() => {
    const { fileId } = useParams()
    const krpanoRef = useRef<any>(null)
    const ref = useRef<HTMLDivElement>(null)
    const { krpanoRef: kRef } = useContext(Context)
    const { krpano: k } = krpanoRef.current ?? {}

    const [curPano, setCurPano] = useState<IPanoSceneData>()

    const [isPreviewModel, setIsPreviewModel] = useState(location.hash.includes("preview"))

    const panoData = useSyncExternalStore(panoStore.subscribe, () => panoStore.getSnapshot())



    panoSubject.subscribe(({ data, panoConfig }) => {
        loadPano(panoConfig.url)
        panoStore.setPanoData(data)

        panoConfig.env === EnvEnum.OFFLINE && setIsPreviewModel(true)
    })


    useMount(() => {
        fileId && loadPano()
    })


    useAsyncEffect(async () => {
        if (!fileId) return
        const data = await panoStore.requestData(fileId)
        if (!data) message.error("该作品已不存在")
        panoStore.setPanoData(data)
        setCurPano(data?.scenes[0])
        location.href.includes('/preview/') && await updateCount(fileId)

        document.title = data.title || document.title
    }, [fileId])



    useEffect(() => {
        panoData?.scenes?.forEach((item: IPanoSceneData) => {
            krpanoRef.current?.createScene(item)
        })
    }, [panoData?.scenes])



    useEffect(() => {
        if (curPano?.id) {
            k?.call(krpanoRef.current?.loadScene(curPano.id))
            if (!isPreviewModel && location.href.includes('/editor/')) return
            initHotspot(curPano.id)
        }
    }, [curPano?.id])



    useImperativeHandle(kRef, () => {
        return {
            getInstance: () => krpanoRef.current,
            loadScene(name: string) {
                k?.call(krpanoRef.current.loadScene(name))
            },
            loadHotspot: (data: IPanoSceneData) => setCurPano(data),
        }
    })


    const loadPano = (url?: string) => {
        window?.embedpano({
            xml: url || "krpano.xml",
            html5: "auto",
            target: "pano",
            onready: (krpano: any) => {
                krpanoRef.current = new Krpano(krpano)
            }
        })
    }


    const initHotspot = (panoId: string) => {
        delay(() => {
            const hotspot = panoData?.scenes?.find(d => d.id === panoId)?.hotspot
            krpanoRef.current?.init(hotspot)
        }, 300)
    }



    return (
        <>
            <div id="pano" ref={ref}></div>
            {isPreviewModel &&
                <SceneContext.Provider value={{
                    krpano: krpanoRef.current,
                    container: ref,
                    panoData,
                    setCurPano
                }}>
                    <SceneSwitch />
                </SceneContext.Provider>
            }
        </>
    )
})


export default Preview