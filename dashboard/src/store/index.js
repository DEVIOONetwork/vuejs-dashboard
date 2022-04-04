import { createStore } from 'vuex'

export default createStore({
    state: {
        user: {
            token: document.cookie.split('; ').find(row => row.startsWith('token=')) ? document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1] : null,
            expired: !document.cookie.split('; ').find(row => row.startsWith('token=')),
            expIn: null,
        },
        lang: localStorage.getItem('lang') || navigator.language || 'en'
    },
    mutations: {
        setToken(state) {
            document.cookie = `token=${state.user.token}; expires=${new Date(parseInt(state.user.expIn)*1000).toUTCString()}; path=/`
        },
        deleteToken(state) {
            state.user.token = null;
            state.user.expired = null;
            
            document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    },
    actions: {},
    modules: {}
})
