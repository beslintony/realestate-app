import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/api';

// stores api calls and status from companies route
const store = (set) => ({
  loading: false,
  status: null,
  companies: null,
  company: [],
  // get companies
  getCompanies: async () => {
    set({ loading: true });
    try {
      const res = await api.getCompanies();
      set({ status: await res.status });
      set({ companies: await res.data.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // get single company
  getSingleCompany: async (id) => {
    set({ property: [] });
    set({ loading: true });
    try {
      const res = await api.getCompany(id);
      set({ status: await res.status });
      set({ company: await res.data.data[0] });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
});

const companiesStore = create(devtools(store));

export default companiesStore;
