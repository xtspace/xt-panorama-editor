
import { message } from "antd"
import { assetUrl } from "./request"

/**
 * @description 判断是否是全景图片
 * @param file 
 */
export function isPanoImage(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = function (e) {
      const image = new Image()
      image.src = e.target?.result as string

      image.onload = function (evt: Event) {
        const target = evt.target as HTMLImageElement;
        const ratio = target.naturalWidth / 2;
        if (ratio >= target.naturalHeight) {
          resolve(true)
        } else {
          resolve(false)
        }
      }

      image.onerror = function () {
        return message.error(`上传失败：${file.name}图片加载出错，请重新压缩图片后上传`)
      }
    }

    reader.readAsDataURL(file)
  })
}


export function uuid(len: number, radix?: number) {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  const uuid = []
  let i = 0;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join("");
}


export function loadAssets(url: string) {
  if (import.meta.env.DEV) {
    return url
  } else {
    return url.replace("/file", assetUrl)
  }
}


export async function asyncPool<T>(poolLimit: number, array: any[], iteratorFn: (item: any) => void) {
  const ret = [];
  const executing: Array<Promise<T>> = [];
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1)) as Promise<T>;
      executing.push(e);
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  return Promise.allSettled(ret);
}

export function onDoubleClick() {
  let isClick = false;
  let clickNum = 0;
  return function ({ singleClick, doubleClick, params }: any) {
    // 如果没有绑定双击函数，直接执行单击程序
    if (!doubleClick) {
      return singleClick && singleClick(params);
    }

    clickNum++;
    // 毫秒内点击过后阻止执行定时器
    if (isClick) {
      return;
    }
    isClick = true;
    setTimeout(() => {
      // 超过1次都属于双击
      if (clickNum > 1) {
        doubleClick && doubleClick(params);
      } else {
        singleClick && singleClick(params);
      }
      clickNum = 0;
      isClick = false;
    }, 300);
  }
}

export function getFormattedTimestamp(format: string = "YYYY-MM-DD HH:mm:ss"): string {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  return format
      .replace("YYYY", year)
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);
}

// 上传图片尺寸限制
export function checkLogoWH(file: any, size: number) {
  return new Promise<void>(function (resolve, reject) {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const image = new Image();
      image.onload = function () {
        if (image.width > size || image.height > size) {
          reject();
        } else {
          resolve();
        }
      };
      image.onerror = reject;
      image.src = e?.target?.result && typeof e?.target?.result === 'string' ? e?.target?.result : '';
    };
    fileReader.readAsDataURL(file);
  });
}