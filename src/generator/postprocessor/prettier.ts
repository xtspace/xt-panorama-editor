
import prettier from "prettier";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserPostCss from "prettier/parser-postcss";
import { PostProcessor } from "@/types/generator/core";

const PARSERS = ["css", "json", "html", "js"];

function factory() {
  const codePrettier: PostProcessor = (content: string, fileType: string) => {
    let parser: prettier.BuiltInParserName;
    if (["js"].includes(fileType)) {
      parser = "babel";
    } else if (fileType === "json") {
      parser = "json-stringify";
    } else if (PARSERS.indexOf(fileType) >= 0) {
      parser = fileType;
    } else {
      return content;
    }

    return prettier.format(content, {
      parser,
      plugins: [parserBabel, parserPostCss, parserHtml],
      singleQuote: true,
      jsxSingleQuote: false,
    });
  };
  return codePrettier;
}

export default factory;
