import IconClose from "@/assets/close.png";
import s from "./index.module.less";
import React from "react";
import { isMobile } from "react-device-detect";

interface IProps {
  title?: React.ReactNode;
  classname?: string;
  rootClassName?: string;
  content: React.ReactNode;
  setIsShow: (v: boolean) => void;
}
export default function TextModel(props: IProps) {
  const { title, content, setIsShow, classname, rootClassName } = props;

  return (
    <>
      <div
        className={s["text-model"].c(classname, {
          "w-98%!": isMobile,
        })}
      >
        <div className={s.header.c("flex justify-between flex-items-center")}>
          <p>{title}</p>
          <img src={IconClose} alt="" onClick={() => setIsShow(false)} />
        </div>
        <div className={s.content.c(rootClassName)}>
          <div
            style={{
              height: isMobile ? "80vh" : 300,
            }}
          >
            {content}
          </div>
        </div>
      </div>
    </>
  );
}
