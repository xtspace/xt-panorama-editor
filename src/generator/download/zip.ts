 import FileSaver from "file-saver";
import JSZip from "jszip";
import { FlattenFile } from "@/types/generator/file";
import { getFormattedTimestamp } from "@/utils/common"

export const generateProjectZip = async (files: FlattenFile) => {
  try {
    const zip = new JSZip();

    Object.values(files || {}).forEach((file) => {
      zip.file(file?.pathName.replace(/^\/+/, ""), file?.content);
    });

    await zip.generateAsync({ type: "blob" }).then((content) => {
      const timestamp = getFormattedTimestamp("YYYY-MM-DD(HH-mm-ss)");
      FileSaver.saveAs(content, `xt-pano-${timestamp}.zip`);
    });
  } catch (e) {
    console.log("failed to download sources: ", e);
  }
};
