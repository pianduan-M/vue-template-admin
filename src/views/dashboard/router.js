import Layout from "@/layout/index.vue";

export default {
  path: "/",
  component: Layout,
  redirect: "/dashboard",
  children: [
    {
      path: "dashboard",
      component: () => import("./index.vue"),
      name: "Dashboard",
      meta: { title: "dashboard", affix: true, icon: "menu", order: 4 },
    },
  ],
};
