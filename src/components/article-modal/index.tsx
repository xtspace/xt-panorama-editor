import React, { useEffect, useMemo, useRef, useState } from "react";
import iconClose from "@/assets/close.png";
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation } from "swiper/modules";
import articleBg from "@/assets/article-bg.png";
import "react-photo-view/dist/react-photo-view.css";

// import RcViewer from 'rc-viewer'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import s from "./index.module.less";
import { IArticleItem } from "../editor-modal";
import TextModal from "@/components/text-model";
import { last } from "lodash-es";
import { useBoolean } from "ahooks";
import { loadAssets } from "@/utils/common";
import { filterXSS } from "xss";
interface CarouselProps {
  articleList: IArticleItem[];
  show: boolean;
  cancel: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Carousel(props: CarouselProps) {
  const { cancel, show, articleList = [] } = props;

  const [showModal, setShowModal] = useState(false);

  const [article, setArticle] = useState<IArticleItem>();

  const isSingle = useMemo(() => articleList.length === 1, [articleList]);

  const [isPlay, { toggle, set }] = useBoolean(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (isSingle && show) {
      setShowModal(true);
      setArticle(last(articleList));
      set(last(articleList)!.autoPlay);
    }
  }, [isSingle, show]);

  const HTML = useMemo(
    () =>
      article?.html.replace(/(src=")[^"]*?(")/g, (match, capture) => {
        const srcValue = match.substring(capture.length, match.length - 1);
        return `${capture}${loadAssets(srcValue)}"`;
      }),
    [article?.html]
  );

  return (
    show && (
      <>
        <div
          style={{ display: articleList.length === 1 ? "none" : "flex" }}
          className={s["carousel-mask"].c("flex-center")}
        >
          <div
            className={s["close-box"].c("flex-center")}
            onClick={() => cancel(false)}
          >
            <img src={iconClose} />
          </div>
          <Swiper
            navigation
            modules={[Virtual, Navigation]}
            virtual
            slidesPerView={1}
            style={{ height: "100vh" }}
          >
            <SwiperSlide>
              <div
                className={
                  isMobile ? s["scroll-container"] : s["multiple-container"]
                }
              >
                {articleList?.map((i) => (
                  <div
                    key={i.id}
                    onClick={() => {
                      setArticle(i);
                      setShowModal(true);
                      set(i.autoPlay);
                    }}
                    className="relative cursor-pointer"
                    style={{
                      background: `url('${loadAssets(
                        articleBg
                      )}') 0 / cover no-repeat`,
                    }}
                  >
                    <div className="absolute w-full box-border bottom-0 h30! lh-30 c-#fff pl-8 left-0 bg-#1A1A1A">
                      {i.name}
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        {showModal && (
          <TextModal
            rootClassName={s["content"]}
            classname="z-999"
            title={
              <div className="flex items-center">
                {article?.audios?.length && (
                  <div
                    className="mr8 w-26 h-26 cursor-pointer"
                    style={{
                      background: `url('${
                        isPlay
                          ? loadAssets(article?.pauseBg?.url)
                          : loadAssets(article?.playBg?.url)
                      }') 0 / cover no-repeat`,
                    }}
                    onClick={() => {
                      !isPlay
                        ? audioRef.current?.play()
                        : audioRef.current?.pause();
                      toggle();
                    }}
                  />
                )}
                <audio
                  onEnded={() => set(false)}
                  ref={audioRef}
                  loop={false}
                  src={last(article?.audios)?.response?.url}
                  autoPlay={article?.autoPlay}
                  className="op-0 w-0"
                />
                <span>{article?.name}</span>
              </div>
            }
            setIsShow={() => {
              setShowModal(false);
              isSingle && cancel(false);
              audioRef.current?.pause();
            }}
            content={
              <div
                dangerouslySetInnerHTML={{
                  __html: filterXSS(HTML!, {
                    whiteList: {
                      p: ["style"],
                      span: ["style"],
                      div: ["style"],
                      b: [],
                      i: [],
                      u: [],
                      strong: [],
                      em: [],
                      ul: [],
                      ol: [],
                      li: [],
                      br: [],
                      h1: ["style"],
                      h2: ["style"],
                      h3: ["style"],
                      h4: ["style"],
                      h5: ["style"],
                      h6: ["style"],
                      table: ["border", "cellspacing", "cellpadding"],
                      tr: [],
                      td: ["style"],
                      th: [],
                      img: ["src", "alt", "title", "width", "height", "style"],
                      video: ["width", "height", "style"],
                      source: [
                        "src",
                        "alt",
                        "title",
                        "width",
                        "height",
                        "style",
                      ],
                      a: ["href", "title", "target"],
                    },
                  }),
                }}
              />
            }
          />
        )}
      </>
    )
  );
}
