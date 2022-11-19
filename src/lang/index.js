import { createI18n } from "vue-i18n";
import { lStorage } from "@/utils";

const messages = {
  "zh-cn": {},
  en: {},
};

export const getLanguage = () => {
  let language = lStorage.get("language");
  if (language) return language;

  // 浏览器使用语言
  language = navigator.language.toLowerCase();
  const locales = Object.keys(messages);
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale;
    }
  }
  return "zh-cn";
};

export const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  messages: messages,
});

export function setupI18n(app) {
  app.use(i18n);
}
