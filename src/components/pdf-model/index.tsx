import iconClose from "@/assets/close.png"
import { isMobile } from 'react-device-detect';
import { IFileInfo } from '@/api/upload';
import s from './index.module.less';
import { loadAssets } from "@/utils/common";
import Preview from "./preview";
import { Document, Page } from "react-pdf";
import { useEffect, useState } from "react";



interface IProps {
    pdfList: IFileInfo[] 
    setIsShow: (v: boolean) => void
}

interface PdfView {
    url: string
    name: string
}

export default function PdfModel(props: IProps) {
    const { setIsShow, pdfList } = props

    const [showPdfObj, setShowPdfObj] = useState<PdfView>()
    const [showPdf, setShowPdf] = useState<boolean>(false)

    const [scale, setScale] = useState<number>(1);


    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight
        height > width && setScale(width / height)
    }, [])


    return <>
        <div className={s["carousel-mask"].c("flex-center")}>
            <div className={s["close-box"].c("flex-center")} onClick={() => setIsShow(false)}>
                <img src={iconClose} />
            </div>
            {
                pdfList.length > 1 ? <div className={isMobile ? s['scroll-container'] : s['multiple-container']}>
                {
                    pdfList.map((pdfItem: IFileInfo) => {
                        return <div key={pdfItem.response.id} onClick={(e) => {
                            e.stopPropagation()
                            setShowPdfObj({ url: pdfItem.response.url, name: pdfItem.response.realFileName })
                            setShowPdf(true)
                        }}>
                            <Document
                                file={loadAssets(pdfItem.response.url)} // 文件地址
                                className="relative cursor-pointer"
                                onLoadSuccess={() => {}}
                            >
                                <Page
                                    scale={isMobile ? scale : 0.3}
                                    pageNumber={1}
                                    error="fail to load resource"
                                    renderMode="canvas"
                                    renderAnnotationLayer={false}
                                    renderTextLayer={false}
                                />
                                <div
                                    className='c-white text-center bottom-0 absolute bg-#00000080 w-full py-5'
                                >
                                    {pdfItem.response.realFileName}
                                </div>
                            </Document>
                        </div>
                    })
                }
                </div> : pdfList.length > 0 ?  <div className="w-full"><Preview fileUrl={loadAssets(pdfList[0].response.url)} title={pdfList[0].response.realFileName} /></div> : <></>
            }
            {
                showPdf && showPdfObj && <div className="w-full absolute z-4002">
                    <div className={s["close-box"].c("flex-center")} onClick={() => setShowPdf(false)}>
                        <img src={iconClose} />
                    </div>
                    <Preview fileUrl={loadAssets(showPdfObj.url)} title={showPdfObj.name} />
                </div>
            }
        </div >
    </>;
}