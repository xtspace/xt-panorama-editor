
import { decrypt, encrypt } from "./crypto";



interface StoreConfig {
  type: "localStorage" | "sessionStorage";
  expire: number;
  isEncrypt: boolean;
}



const config: StoreConfig = {
  type: "localStorage",
  expire: 1 * 60 * 60 * 24, //过期时间 单位：秒
  isEncrypt: true,
};



export const isSupportStorage = () => {
  return typeof Storage !== "undefined";
};



/**
 * @description 设置 setStorage
 * @param key 键
 * @param value 值
 * @param expire 过期时间
 */
export const setStorage = (key:string, value:any, expire = 0) => {
  if (value === "" || value === null || value === undefined) {
    value = null;
  }

  if (isNaN(expire) || expire < 0) throw new Error("Expire must be a number");

  expire = (expire ? expire : config.expire) * 1000;
  const data = {
    value: value,
    time: Date.now(),
    expire: expire, 
  };

  const encryptString = config.isEncrypt
    ? encrypt(JSON.stringify(data))
    : JSON.stringify(data);

  window[config.type].setItem(key, encryptString);
};



export const getStorage = (key: string) => {
  if (
    !window[config.type].getItem(key) ||
    JSON.stringify(window[config.type].getItem(key)) === "null"
  ) {
    return null;
  }

  const storage = config.isEncrypt
    ? JSON.parse(decrypt(window[config.type].getItem(key)!))
    : JSON.parse(window[config.type].getItem(key)!);

  const nowTime = Date.now();

  if (storage.expire && config.expire * 6000 < nowTime - storage.time) {
    removeStorage(key);
    return null;
  } else {
    setStorage(key, storage.value);
    return storage.value;
  }
};



export const hasStorage = (key: string) => {
  const arr = getStorageAll().filter((item) => {
    return item.key === key;
  });
  return !!arr.length;
};



export const getStorageKeys = () => {
  const items: any[] = getStorageAll();
  const keys: any[] = [];
  for (let index = 0; index < items.length; index++) {
    keys.push(items[index].key);
  }
  return keys;
};



export const getStorageLength = () => {
  return window[config.type].length;
};



export const getStorageAll = () => {
  const len = window[config.type].length;
  const arr = [];
  for (let i = 0; i < len; i++) {
    const getKey = window[config.type].key(i);
    const getVal = window[config.type].getItem(getKey!);
    arr[i] = { key: getKey, val: getVal };
  }
  return arr;
};



export const removeStorage = (key:string) => {
  window[config.type].removeItem(key);
};



export const clearStorage = () => {
  window[config.type].clear();
};
