import { createStore } from 'vuex'

export default createStore({
  state: {
    myLove: []
  },
  getters: {
  },
  mutations: {
  setMyLove (state, payload) {
    if(payload.isLove == false){
      state.myLove.push(payload);
    }else{
      state.myLove.splice(state.myLove.indexOf(payload),1);
    }
  },
  },
  actions: {
  },
  modules: {
  }
})
