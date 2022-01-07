import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import decode from 'jwt-decode';
import api from '../api/api';

const user = JSON.parse(localStorage.getItem('user'));

// gloabl states for the login
let store = (set, get) => ({
  loginLoading: false,
  loginStatus: null,
  accessToken: null,
  refreshToken: null,
  currentAccessToken: user?.state.accessToken || null,
  currentRefreshToken: user?.state.refreshToken || null,
  isloggedin: false,
  role: null,
  redirect: null,
  userProfile: [],
  // login
  login: async (body) => {
    set(() => ({ loginLoading: true }));
    try {
      const res = await api.login(body);
      set({ loginStatus: await res.status });
      set({ accessToken: await res.data.AccessToken });
      set({ refreshToken: await res.data.RefreshToken });
      set({ currentAccessToken: get().accessToken });
      set({ currentRefreshToken: get().refreshToken });
      set({ role: decode(get().currentAccessToken) });
      set({ isloggedin: true });
    } catch (err) {
      set({ loginStatus: await err.response.status });
      console.error({ err });
    } finally {
      set(() => ({ loginLoading: false }));
    }
  },
  // get profile
  getProfile: async () => {
    set(() => ({ loginLoading: true }));
    try {
      return api.getProfile();
    } catch (err) {
      set({ loginStatus: await err?.response?.status });
      console.error({ err });
    } finally {
      set(() => ({ loginLoading: false }));
    }
  },
  // set role
  setRole: (decodedRole) => {
    set({ role: decodedRole });
  },
  // set password
  setPassword: async (password) => {
    set(() => ({ loginLoading: true }));
    try {
      const res = await api.updatePassword(password);
      set({ loginStatus: await res.status });
    } catch (err) {
      set({ loginStatus: await err?.response?.status });
      console.error({ err });
    } finally {
      set(() => ({ loginLoading: false }));
    }
  },
  setPicture: async (picture) => {
    set(() => ({ loginLoading: true }));
    try {
      const res = await api.updatePicture(picture);
      set({ loginStatus: await res.status });
    } catch (err) {
      console.error({ err });
    } finally {
      set(() => ({ loginLoading: false }));
    }
  },
  // get user profile
  setUserProfile: async () => {
    set(() => ({ loginLoading: true }));
    try {
      const res = await api.getUserProfile();
      set({ userProfile: await res.data });
      set({ loginStatus: await res.status });
    } catch (err) {
      set({ loginStatus: await err?.response?.status });
      console.error({ err });
    } finally {
      set(() => ({ loginLoading: false }));
    }
  },
  // set redirects
  setRedirects: (next) => set(() => ({ redirect: next })),
  // deletes everything
  deleteEverything: () => set({}, true),
});

store = devtools(store);
// persist the data to localStorage
store = persist(store, {
  name: 'user',
  whitelist: 'accessToken,refreshToken',
});

const userStore = create(devtools(store));

export default userStore;
