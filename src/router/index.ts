// import type { App } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: import("/@/view/Home/index.vue"),
    meta: { title: "Home" }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
