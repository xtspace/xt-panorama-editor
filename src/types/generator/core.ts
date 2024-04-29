import { ResultDir } from "./file";


export interface IProjectSlot {
  path: string[];
}


export interface IProjectTemplate {
  slots: Record<string, IProjectSlot>;
  generateTemplate: () => ResultDir;
}


export interface IProjectPlugins {
  plugins: Record<string, Array<Function>>;
}


export type PostProcessor = (content: string | Blob, fileType: string, name?: string) => string;
