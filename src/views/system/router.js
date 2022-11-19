import Layout from "@/layout/index.vue";

export default {
  path: "/system",
  component: Layout,
  redirect: "user",
  meta: { title: "系统管理", icon: "homepage", affix: true, order: 2 },
  children: [
    {
      path: "user",
      component: () => import("./user/index.vue"),
      name: "user",
      meta: { title: "user", icon: "user" },
    },
    {
      path: "role",
      component: () => import("./role/index.vue"),
      name: "role",
      meta: { title: "role", icon: "role" },
    },
  ],
};
