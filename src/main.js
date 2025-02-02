import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import Vue3Lottie from "vue3-lottie";
import Shimmer from "vue3-shimmer";

import VCalendar from "v-calendar";
import "v-calendar/style.css";
import "v-calendar/dist/style.css";

const app = createApp(App);

app.use(router);
app.use(Vue3Lottie);
app.use(Shimmer);
app.use(VCalendar, {});
app.mount("#app");
