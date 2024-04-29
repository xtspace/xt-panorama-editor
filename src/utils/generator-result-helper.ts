import { FlattenFile, ResultDir, ResultFile } from "@/types/generator/file";

export function createResultFile(name: string, ext = "js", content = ""): ResultFile {
  return {
    name,
    ext,
    content,
  };
}

export function addDirectory(target: ResultDir, dir: ResultDir): void {
  if (target.dirs.findIndex((d) => d.name === dir.name) < 0) {
    target.dirs.push(dir);
  }
}

export function addFile(target: ResultDir, file: ResultFile): void {
  if (target.files.findIndex((f) => f.name === file.name && f.ext === file.ext) < 0) {
    target.files.push(file);
  }
}

export function createResultDir(name: string): ResultDir {
  return {
    name,
    dirs: [],
    files: [],
  };
}

export function flattenResult(dir: ResultDir, cwd = ""): FlattenFile[] {
  if (!dir.files.length && !dir.dirs.length) {
    return [];
  }

  return [
    ...dir.files.map(
      (file): FlattenFile => ({
        pathName: joinPath(cwd, `${file.name}${file.ext ? `.${file.ext}` : ""}`),
        content: file.content,
      }),
    ),
  ].concat(...dir.dirs.map((subDir) => flattenResult(subDir, joinPath(cwd, subDir.name))));
}


function joinPath(...pathParts: string[]): string {
  return pathParts
    .filter((x) => x !== "" && x !== ".")
    .join("/")
    .replace(/\\+/g, "/")
    .replace(/\/+/g, "/");
}
