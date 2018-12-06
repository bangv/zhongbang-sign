import Vue from "vue";
import Router from "vue-router";
import PageLogin from "./views/PageLogin";
Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "",
      component: PageLogin
    },
    {
      path: "/login",
      name: "Login",
      component: PageLogin
    }
  ]
});
//全局路由守卫
// router.beforeEach((to, from, next) => {
//   // 如果session没有用户信息，且路由目标不是登录页，则跳转至登录页
//   if (!sessionManagement.getUserInfo() && to["name"] !== "Login") {
//     next({ name: "Login" });
//   }
//   next();
// });

export default router;
