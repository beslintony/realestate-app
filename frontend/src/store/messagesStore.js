import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/api';
import socket from '../Socket';

// gloabl states for the messges
const store = (set, get) => ({
  loading: false,
  status: null,
  allContexts: null,
  createContext: null,
  getMessages: null,
  currentContext: null,
  newMessage: false,
  // currentContext api call
  setCurrentContext: (input) => set(() => ({ currentContext: input })),
  // new message api call
  setNewMessage: (input) => set(() => ({ newMessage: input })),
  // allContexts api call
  setAllcontexts: async () => {
    set({ loading: true });
    try {
      const res = await api.allContexts();
      set({ status: await res.status });
      set({ allContexts: await res.data.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // create Context api call
  setCreateContext: async (body) => {
    set({ loading: true });
    try {
      const res = await api.createContext(body);
      socket.emit('create', String(res.data.contextId));
      set({ createContext: await res.data });
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // send message api call
  setSendMessage: async (id, body) => {
    set((state) => ({ loading: true }));
    try {
      const res = await api.sendMessage(id, body);
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // get messages api call
  setGetMessages: async (id) => {
    set(() => ({ loading: true }));
    try {
      const res = await api.getMessages(id);
      set({ getMessages: await res.data.data });
      set({ status: await res.status });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
  // check new messages after login
  checkNewMessages: async () => {
    set({ loading: true });
    try {
      const res = await api.checkNewMessages();
      set({ status: await res.status });
      set({ newMessage: await res.data });
    } catch (err) {
      set({ status: await err?.response?.status });
      console.error({ err });
    } finally {
      set({ loading: false });
    }
  },
});

const messageStore = create(devtools(store));

export default messageStore;
