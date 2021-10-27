import Vue from 'vue';
import Vuex from 'vuex';
import FSServices from '../services/FSServices';

Vue.use(Vuex);

const state = {
  arbitraryData: {
    somethingComplex: {
      a: 'nope',
      b: 'yep',
      c: true,
    },
  },
  prs: [],
  organization: {
    name: '',
    users: [],
  },
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
  SET_PR(state, payload) {
    Vue.set(state.prs, payload.index, payload.pr);
  },
  SET_ORG(state, payload) {
    state.organization = payload;
  },
  SET_PRS(state, payload) {
    state.prs = payload;
  },
  UPDATE_ARBITRARY(state, payload) {
    state.arbitraryData = payload;
  },
};

const actions = {
  async updatePr({ commit, state }, pr) {
    pr.orgId = state.organization.id;
    await FSServices.updatePr(pr.id, pr);
    const index = state.prs.findIndex((currPr) => currPr.id === pr.id);
    commit('SET_PR', { index, pr });
  },

  async createPr({ commit, state }, pr) {
    pr.orgId = state.organization.id;
    delete pr.id;
    const res = await FSServices.addPr(pr);
    const updatedPrs = [...state.prs];
    updatedPrs.push(res);
    commit('SET_PRS', updatedPrs);
  },

  async deactivatePr({ commit, state }, id) {
    const index = state.prs.findIndex((currPr) => currPr.id === id);
    const updatedPr = { ...state.prs[index] };
    updatedPr.deactivated = new Date();
    await FSServices.updatePr(updatedPr.id, updatedPr);
    commit('SET_PR', { index, pr: updatedPr });
  },

  async fetchOrgData({ commit }, id) {
    const newOrgData = await FSServices.fetchOrgData(id);
    const newOrgPrs = (await FSServices.fetchOrgPrs(id)) || [];

    commit('SET_ORG', newOrgData);
    commit('SET_PRS', newOrgPrs);
  },

  async createNewOrg({ dispatch }, data) {
    const { email, password } = data;
    delete data.email;
    delete data.password;
    const newOrgData = await FSServices.registerOrg(email, password, data);

    await dispatch('fetchOrgData', newOrgData.id);
  },

  async loginUser({ dispatch }, data) {
    const { email, password } = data;
    const orgId = await FSServices.loginUser(email, password);

    await dispatch('fetchOrgData', orgId);
  },

  async updateOrg({ state, commit }, data) {
    console.log(data);
    const updatedOrg = data;
    updatedOrg.deactivated = state.organization.deactivated;
    updatedOrg.id = state.organization.id;

    await FSServices.updateOrg(updatedOrg);
    await commit('SET_ORG', updatedOrg);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  strict: true
});
