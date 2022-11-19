export const basicRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: { hidden: true },
  },
  // {
  //   path: "/404",
  //   component: () => import("@/views/error-page/404.vue"),
  //   meta: { hidden: true },
  // },
];

const modules = import.meta.glob("@/views/**/router.js", {
  eager: true,
});

const asyncRoutes = [];

Object.keys(modules).forEach((key) => {
  asyncRoutes.push(modules[key].default);
});

export { asyncRoutes };
