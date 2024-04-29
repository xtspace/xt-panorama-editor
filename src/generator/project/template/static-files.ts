import { ResultDir } from "@/types/generator/file";
import { createResultDir } from "@/utils/generator-result-helper";


export function generateStaticFiles(root = createResultDir(".")): ResultDir {
  return root
}
