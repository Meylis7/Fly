import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Vue3Lottie from "vue3-lottie";

import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "v-calendar/dist/style.css";

import i18n from "./i18n";

const app = createApp(App);

app.use(router);
app.use(i18n);
app.use(Vue3Lottie);
app.use(VCalendar, {});
app.mount("#app");
