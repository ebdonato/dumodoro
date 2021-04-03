const routes = [
    {
        path: "/",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("pages/Index.vue"), name: "Index" },
            { path: "config", component: () => import("pages/Config.vue"), name: "Config" },
        ],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "*",
        component: () => import("pages/Error404.vue"),
    },
]

export default routes
