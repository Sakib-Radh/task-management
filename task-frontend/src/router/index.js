import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TaskManagement from "../views/TaskManagementView.vue";

const routes = [
  { path: "/login", component: LoginView,
    meta: { requiresGuest: true }
  },
  { path: "/register", component: RegisterView,
    meta: { requiresGuest: true }
  },
  {
    path: "/tasks",
    component: TaskManagement,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/tasks");
  } else {
    next();
  }
});

export default router;
