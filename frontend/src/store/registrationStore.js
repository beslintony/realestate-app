import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/api';

// gloabl states for the registration
const store = (set) => ({
  registerLoading: false,
  registerStatus: null,
  deleteRegisterStatus: () => set(() => ({ registerStatus: null })),
  // user register api call
  setRegister: async (user) => {
    set(() => ({ registerLoading: true }));
    try {
      const res = await api.signup(user);
      set({ registerStatus: await res.status });
    } catch (err) {
      set({ registerStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ registerLoading: false });
    }
  },
  // register agent api call
  setRegisterAgent: async (user) => {
    set(() => ({ registerLoading: true }));
    try {
      const res = await api.registerAgent(user);
      set({ registerStatus: await res.status });
    } catch (err) {
      set({ registerStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ registerLoading: false });
    }
  },
});

const registrationStore = create(devtools(store));

export default registrationStore;
