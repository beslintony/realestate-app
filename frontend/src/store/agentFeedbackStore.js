import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/api';
// stores api calls and status from feedbacks route

const store = (set) => ({
  loading: false,
  status: null,
  userFeedback: [],
  agentFeedbacks: [],
  agentData: [],

  // get user feedback
  setUserFeedback: async (id) => {
    set({ loading: true });
    // set({ userFeedback: [] });
    try {
      const res = await api.getUserFeedback(id);
      set({ status: await res.status });
      set({ userFeedback: await res.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  //get agent feedback
  setAgentFeedbacks: async (id) => {
    set({ loading: true });
    set({ agentFeedbacks: [] });
    try {
      const res = await api.getAgentFeedbacks(id);
      set({ status: await res.status });
      set({ agentFeedbacks: await res.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // edit feedback api call
  updateFeedback: async (id, data) => {
    set({ loading: true });
    try {
      const res = await api.updateFeedback(id, data);
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // delete feedback api call
  deleteFeedback: async (id) => {
    set({ loading: true });
    try {
      set({ userFeedback: [] });
      const res = await api.deleteFeedback(id);
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // create feedback api call
  setFeedback: async (data) => {
    set({ loading: true });
    try {
      const res = await api.createFeedback(data);
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // set Agent details
  setAgentData: async (id) => {
    set({ loading: true });
    try {
      const res = await api.getAgentDetails(id);
      set({ status: await res.status });
      set({ agentData: await res.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  deleteEverything: () =>
    // default
    set({
      userFeedback: [],
      agentFeedbacks: [],
      agentData: [],
    }),
});

const agentOverviewStore = create(devtools(store));

export default agentOverviewStore;
