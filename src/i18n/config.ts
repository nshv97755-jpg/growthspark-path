import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./resources";

export const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "ur", label: "اردو" },
  { code: "as", label: "অসমীয়া" },
  { code: "mai", label: "मैथिली" },
  { code: "sa", label: "संस्कृत" },
  { code: "ne", label: "नेपाली" },
  { code: "kok", label: "कोंकणी" },
  { code: "ks", label: "کٲشُر" },
  { code: "sd", label: "سنڌي" },
  { code: "doi", label: "डोगरी" },
  { code: "mni", label: "মৈতৈলোন্" },
  { code: "brx", label: "बड़ो" },
] as const;

export const LANGUAGE_STORAGE_KEY = "growthpilot.lang";

const getInitialLang = () => {
  if (typeof window === "undefined") return "en";
  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || "en";
  } catch {
    return "en";
  }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: getInitialLang(),
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  });
}

export default i18n;
