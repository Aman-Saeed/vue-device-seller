import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Profile from "@/views/Profile.vue";
import NotFound from "@/views/NotFound.vue";
import Unauthorized from "@/views/Unauthorized.vue";
import Admin from "@/views/Admin.vue";
import Store from "../store";
import Role from "../models/role";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    name: "home",
    path: "/home",
    component: Home,
  },
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    name: "register",
    path: "/register",
    component: Register,
  },
  {
    name: "profile",
    path: "/profile",
    component: Profile,
    meta: { roles: [Role.ADMIN, Role.USER] },
  },
  {
    name: "admin",
    path: "/admin",
    component: Admin,
    meta: { roles: [Role.ADMIN] },
  },
  {
    name: "404",
    path: "/404",
    component: NotFound,
  },
  {
    name: "401",
    path: "/401",
    component: Unauthorized,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const currentUser = Store.getters["currentUser"];

  if (roles?.length) {
    if (!currentUser) {
      return next({ path: "/login" });
    }

    const hasRole = roles.includes(currentUser.role);
    if (!hasRole) {
      return next({ path: "/401" });
    }
  }
  next();
});

export default router;
