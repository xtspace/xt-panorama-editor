
import { ResultDir, ResultFile } from "@/types/generator/file";
import { addDirectory, addFile, createResultDir } from "./generator-result-helper";

type FuncFileGenerator = () => [string[], ResultFile];


export function insertFile(root: ResultDir, path: string[], file: ResultFile) {
  let current: ResultDir = root;
  path.forEach((pathNode) => {
    const dir = current.dirs.find((d) => d.name === pathNode);
    if (dir) {
      current = dir;
    } else {
      const newDir = createResultDir(pathNode);
      addDirectory(current, newDir);
      current = newDir;
    }
  });
  addFile(current, file);
}


export function runFileGenerator(root: ResultDir, fun: FuncFileGenerator) {
  try {
    const result = fun();
    const [path, file] = result;
    insertFile(root, path, file);
  } catch (error) {
    throw new Error(`Error: ${typeof fun}`);
  }
}
