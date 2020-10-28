import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//定义初始变量
const state = {
    token: '',
    nickName: '',
}

//通过getters获取变量
const getters = {
    getToken(state) {
        return state.token
    },
    getNickName(state) {
        return state.nickName
    }
}

//通过mutations改变初始变量值
//改变变量值: this.$store.commit('', val);
const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setNickName(state, nickName) {
        state.nickName = nickName
    },
    loginOut(state) {
        state.token = '';
        state.nickName = '';
    }
}

//通过actions触发mutattions里的方法
const actions = {
    login(context, payload) {
        console.log(payload);
        context.commit('setToken', payload.id);
        context.commit('setNickName', payload.nickName);
    },
    loginOut(context) {
        context.commit('loginOut');
    }

}

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;