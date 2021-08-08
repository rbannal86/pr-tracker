import Vue from 'vue';
import Vuex from 'vuex';
import BASE_STORE from './BASE_STORE';

Vue.use(Vuex);

const state = {
  prs: BASE_STORE.prs,
  organization: BASE_STORE.organization,
};

const getters = {
  allPrs: () => state.prs,
  orgData: () => state.organization,
  prById: (state) => (id) => state.prs.find((pr) => pr.id === id),

  prDisplayData: (state) => (id) => {
    const pr = state.prs.find((pr) => pr.id === id);
    return {
      assignee: pr?.assignee,
      reviewers: pr?.reviewers,
      reviewCount: pr?.reviewCount,
      openDate: pr?.openDate,
      approvals: pr?.approvals,
    };
  },
};

const mutations = {
  SET_PRS(state, payload) {
    Vue.set(state.prs, payload.index, payload.pr);
  },
};

const actions = {
  updatePr({ commit, state }, pr) {
    const index = state.prs.findIndex((currPr) => currPr.id === pr.id);
    commit('SET_PRS', { index, pr });
  },
  createPr({ commit, state }, pr) {
    const newId =
      Math.max.apply(
        Math,
        state.prs.map((pr) => pr.id)
      ) + 1;
    pr.id = newId;
    const index = state.prs.length;

    commit('SET_PRS', { index, pr });
  },
  // eslint-disable-next-line no-unused-vars
  deactivatePr({ commit, state }, id) {
    const index = state.prs.findIndex((currPr) => currPr.id === id);
    const updatedPr = { ...state.prs[index] };
    updatedPr.deactivated = new Date();
    commit('SET_PRS', { index, pr: updatedPr });
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
