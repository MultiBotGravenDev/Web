const namespaced = true;

const state = {
  user: {},
  admin: false,
};

const mutations = {
  SET_USER: (state, payload) => {
    state.user = payload.user;
    state.admin = payload.admin;
  },
};

const actions = {
  setUser: ({commit}, payload) => {
    commit('SET_USER', payload.data);
  },
};

export default {
  namespaced,
  state,
  mutations,
  actions,
};
