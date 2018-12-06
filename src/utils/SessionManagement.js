const USERINFO = 'userInfo';

export default {
    setUserInfo: (userInfo) => {
        sessionStorage.setItem(USERINFO, userInfo)
    },

    getUserInfo: () => sessionStorage.getItem(USERINFO)
}