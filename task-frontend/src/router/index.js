import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import TaskManagement from "../views/TaskManagementView.vue";

const routes = [
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
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
  const store = useStore();
  const isAuthenticated = store.getters.isAuthenticated;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
