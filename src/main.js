import "./assets/css/main.css";
import Vue3Lottie from 'vue3-lottie'

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "v-calendar/dist/style.css";

const app = createApp(App);

app.use(router);
app.use(Vue3Lottie);
app.use(VCalendar, {});
app.mount("#app");
