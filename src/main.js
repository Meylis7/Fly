import "./assets/css/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import VCalendar from "v-calendar";
import "v-calendar/style.css";
import 'v-calendar/dist/style.css';



const app = createApp(App);

app.use(router);
app.use(VCalendar, {}); 
app.mount("#app");
