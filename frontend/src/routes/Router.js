import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/main";
import CookieUtil from "@/utils/cookie";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/templates/Default.vue"),
    children: [
      {
        path: "/",
        name: "Dashboard",
        component: () => import("@/views/Dashboard/DashboardView.vue"),
      },
      {
        path: "/usuarios",
        name: "Usuarios",
        children: [
          {
            path: "/usuarios/lista",
            name: "Lista de usuários",
            component: () => import("@/views/Usuarios/UsuariosListagem.vue"),
          },
          {
            path: "/usuarios/criar",
            name: "Criar novo usuário",
            component: () => import("@/views/Usuarios/NovoUsuarioView.vue"),
          }
        ]
      },
      {
        // Rotas de perfil
        path: "/perfil",
        name: "Perfil",
        children: [
          {
            path: "/perfil",
            name: "Perfil",
            component: () => import("@/views/Perfil/ConfiguracoesView.vue"),
          }
        ],
      },
      {
        path: "/relatorios",
        name: "Relatórios",
        children: [
          {
            path: "/relatorios/usuarios",
            name: "Relatorio de Usuários",
            component: () => import("@/views/Relatorios/RelatorioUsuarioView.vue"),
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const mainStore = useMainStore();
  if (to.path !== "/login") {
    if (!mainStore.isAuth || !CookieUtil.getCookie("@gestao_inteligente:token")) {
      next("/login");
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router;
