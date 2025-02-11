import { createI18n } from "vue-i18n";
import { watch } from "vue";
import en from "./locales/en.js";
import ru from "./locales/ru.js";
import tm from "./locales/tm.js";

// Get saved language from localStorage or default to 'en'
const savedLanguage = localStorage.getItem("user-language") || "en";

function loadLocaleMessages() {
  const locales = [{ en: en }, { ru: ru }, { tm: tm }];
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
