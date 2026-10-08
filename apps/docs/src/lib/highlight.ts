import "server-only";
import {
  createHighlighter,
  createJavaScriptRegexEngine,
  type Highlighter,
} from "shiki";

const THEME = "vitesse-black";
const LANGUAGES = [
  "tsx",
  "ts",
  "jsx",
  "js",
  "bash",
  "css",
  "json",
  "md",
  "html",
];

let highlighter: Promise<Highlighter> | undefined;

/** Highlights code to HTML with Shiki. Unknown languages render as plain text. */
export async function highlight(
  code: string,
  language = "text",
): Promise<string> {
  highlighter ??= createHighlighter({
    themes: [THEME],
    langs: LANGUAGES,
    engine: createJavaScriptRegexEngine(),
  });
  const instance = await highlighter;
  const lang = instance.getLoadedLanguages().includes(language)
    ? language
    : "text";
  return instance.codeToHtml(code, { lang, theme: THEME });
}

/** Shiki language of a file, from its extension. */
export function getLanguage(fileName: string): string {
  return fileName.split(".").pop() ?? "text";
}
