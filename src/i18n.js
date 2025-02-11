import { createI18n } from "vue-i18n";
import { watch } from "vue";
import en from "./locales/en.js";
import ru from "./locales/ru.js";
import tk from "./locales/tk.js";

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("locale") || "en";

function loadLocaleMessages() {
  const locales = [{ en: en }, { ru: ru }, { tk: tk }];
  const messages = {};
  locales.forEach((lang) => {
    const key = Object.keys(lang);
    messages[key] = lang[key];
  });
  return messages;
}

const i18n = createI18n({
  legacy: false, // Enable Composition API mode
  locale: savedLanguage,
  fallbackLocale: "en",
  messages: loadLocaleMessages(),
});

// Watch for locale changes
watch(
  () => i18n.global.locale.value,
  (newLocale) => {
    localStorage.setItem("user-language", newLocale);
  }
);

export default i18n;
