import Layout from "@/layout/index.vue";

export default {
  path: "/",
  component: Layout,
  redirect: "https://github.com/",
  meta: { order: 5 },
  children: [
    {
      path: "https://github.com/",
      name: "Github",
      meta: { title: "github", affix: true, icon: "github" },
    },
  ],
};
