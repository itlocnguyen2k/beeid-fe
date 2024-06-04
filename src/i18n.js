import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vn from "./assets/data/locales/vn.json";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "vn",
    lng: "vn",
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: { vn: { translation: vn } },
  });

export default i18n;
