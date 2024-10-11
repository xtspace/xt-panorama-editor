import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import styles from './preview.module.less';
import { Spin, Tooltip } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { produce } from "immer";


pdfjs.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";


interface IProps {
  fileUrl: string
  title: string
}

export default function PreviewPdf(props: IProps) {

  const [pageData, setPageData] = useState({
    numPages: 1,
    pageWidth: 0
  });
  const [initWidth, setInitWidth] = useState<number>(0)

  useEffect(() => {
    const width = window.innerWidth > window.innerHeight ? window.innerWidth / 3 : window.innerWidth * 0.9
    setInitWidth(width)
    setPageData(produce(pageData, draft => {
      if (!draft) return
      draft.pageWidth = width
    }))
  }, [])

  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setPageData(produce(pageData, draft => {
      if (!draft) return
      draft.numPages = numPages
    }))
  }

  const pageZoomOut = () => {
    if (pageData.pageWidth <= initWidth) return
    const pageWidth = pageData.pageWidth * 0.8;
    setPageData(produce(pageData, draft => {
      if (!draft) return
      draft.pageWidth = pageWidth;
    }))
  };

  const pageZoomIn = () => {
    const pageWidth = pageData.pageWidth * 1.2
    setPageData(produce(pageData, draft => {
      if (!draft) return
      draft.pageWidth = pageWidth;
    }))
  }

  return (
    <div className={styles.view}>
      <div className={styles.pageContainer}>
        <Document
          file={props.fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<Spin size="large" />}
        >
          {Array.from(new Array(pageData.numPages), (_, index) => (
            <Page
              key={`page-${index + 1}`}
              pageNumber={index + 1}
              width={pageData.pageWidth}
              loading={<Spin size="large" />}
              renderMode="canvas"
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      </div>

      <div className={styles.pageTool}>
        <Tooltip title="放大">
          <PlusCircleOutlined className="mr-10 font-size-28" onClick={pageZoomIn} />
        </Tooltip>
        <Tooltip title="缩小">
          <MinusCircleOutlined className="font-size-28" onClick={pageZoomOut} />
        </Tooltip>
      </div>
    </div>
  );
}