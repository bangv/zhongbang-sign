import axios from "axios";
import router from "../../router";
import sessionManagement from "../SessionManagement";
import Vue from 'vue'

// axios.interceptors.request.use(
//   config => {
//     if (!sessionManagement.getUserInfo()) {
//       sessionStorage.clear();
//       router.replace({
//         path: "/loin"
//       });
//     }
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
axios.interceptors.response.use(
  function (response) {
    if (response.data.code !== 200) {
      if (response.data.code === 400) {
        sessionStorage.clear();
        router.replace({
          path: "/login"
        });
        Vue.prototype.$message(response.data.msg);
      } else {
        response.data.msg && Vue.prototype.$message(response.data.msg);
      }
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//
// const ZHONGBANG = 'zhongbang'
//
// // 开发人员在这里输入开发人员和API地址，如果有开发人员，请在vue.config.js里配置新的代理
// const Modules = {
//   SYS_LOGIN: ZHONGBANG + '/user/login',
// }
//
// /**
//  * method: 'get' or 'post' , 'post'是默认值
//  *
//  * @param options
//  * @returns {*}
//  */
// let request = (options) => {
//   //default options, mixin options
//   let opt = {
//     method: 'post',
//     ...options
//   }
//   console.log('url:', process.env.VUE_APP_HOST + opt['url'])
//   return axios[opt.method](process.env.VUE_APP_HOST + opt['url'], opt['params']);
// }
//
// // request({
// //   url: Modules.SYS_LOGIN,
// //   params: {
// //     mobile: "4634",
// //     pwd: "123456",
// //     verifyCode: "1234"
// //   }
// // }).then(res => {
// //   console.log(res);
// // });
// export {
//   request,
//   Modules
// }
