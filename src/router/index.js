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

  const userHasRole = (user, requiredRoles) => {
    if (!user) return false;
    const role = user.role;
    if (!role) return false;

    // role is a string
    if (typeof role === "string") {
      return requiredRoles.some(
        (r) => role === r || role === `ROLE_${r}` || role.toUpperCase() === r
      );
    }

    // role is an array
    if (Array.isArray(role)) {
      return role.some(
        (ur) =>
          requiredRoles.includes(ur) ||
          requiredRoles.includes(ur.replace(/^ROLE_/, ""))
      );
    }

    // role is an object with .name or .role
    if (typeof role === "object") {
      const name = role.name || role.role;
      return requiredRoles.some((r) => name === r || name === `ROLE_${r}`);
    }

    return false;
  };

  if (roles?.length) {
    if (!currentUser) {
      return next({ path: "/login" });
    }

    if (!userHasRole(currentUser, roles)) {
      return next({ path: "/401" });
    }
  }
  next();
});

export default router;
