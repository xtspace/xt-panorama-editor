import c from "classnames";

// 全局声明类型扩展
declare global {
  interface String {
    c: (...args: Parameters<typeof c>) => string;
  }
}

export const classNameExpansion = () => {
  /**
   * 在字符串原型上添加 classnames 方法
   * @param args
   * @returns {string}
   */
  String.prototype.c = function (...args: Parameters<typeof c>) {
    return c(this.valueOf(), ...args);
  };
};
