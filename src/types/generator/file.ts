
export interface ResultDir {
  name: string;
  dirs: ResultDir[];
  files: ResultFile[];
}

/**
 * 导出内容，对文件的描述
 */
export interface ResultFile {
  name: string;
  ext: string;
  content: string | Blob;
}


export interface FlattenFile {
  pathName: string;
  content: string | Blob;
}