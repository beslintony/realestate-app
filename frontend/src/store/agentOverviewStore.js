import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/api';
// stores api calls and status from agentOverview route
const store = (set, get) => ({
  loading: false,
  status: null,
  agentOverview: null,
  property: [],
  // agent overview api call
  getAgentOverview: async () => {
    set({ loading: true });
    try {
      const res = await api.agentOverview();
      set({ status: await res.status });
      set({ agentOverview: await res.data.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // single agent property api call
  getSingleAgentProperty: async (id) => {
    set({ property: [] });
    set({ loading: true });
    try {
      const res = await api.getSingleAgentProperty(id);
      set({ status: await res.status });
      set({ property: await res.data.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // edit property api call
  editProperty: async (id, data) => {
    set({ property: [] });
    set({ loading: true });
    try {
      const res = await api.editProperty(id, data);
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
});

const agentOverviewStore = create(devtools(store));

export default agentOverviewStore;
