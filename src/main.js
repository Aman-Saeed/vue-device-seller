import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./global.css";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import $ from "jquery";
window.$ = $;
window.jQuery = $;

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faDesktop,
  faHome,
  faLaptop,
  faUserCircle,
  faTabletAlt,
  faMobileAlt,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faHome,
  faUserCircle,
  faDesktop,
  faLaptop,
  faTabletAlt,
  faMobileAlt
);

const app = createApp(App);

app.use(store);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
