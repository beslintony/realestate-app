import create from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../api/api';

// gloabl states for the realestates
const store = (set) => ({
  realestatesStatus: null,
  realEstates: [],
  //realestates api call
  setRealEstates: async (url) => {
    try {
      const res = await api.realestates(url);
      set({ realEstates: await res?.data });
      set({ realestatesStatus: await res?.status });
    } catch (err) {
      set({ realestatesStatus: await err.response?.status });
      console.error(err);
    }
  },
  property: [],
  propertyStatus: null,
  isloading: false,
  recommendations: [],
  // get property api call
  getProperty: async (id) => {
    set({ property: [] });
    set({ isloading: true });
    try {
      const res = await api.singleRealestate(id);
      set({ property: await res.data.data });
      set({ propertyStatus: await res.status });
    } catch (err) {
      console.error(err.response);
      set({ propertyStatus: await err.response?.status });
    } finally {
      set({ isloading: false });
    }
  },
  //create property api call
  createProperty: async (property) => {
    set(() => ({ isloading: true }));
    try {
      const res = await api.createProperty(property);
      set({ propertyStatus: await res.status });
    } catch (err) {
      set({ propertyStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ isloading: false });
    }
  },
  //check recommendations
  checkRecommendations: async () => {
    set(() => ({ isloading: true }));
    try {
      const res = await api.checkRecommendations();
      set({ propertyStatus: await res.status });
    } catch (err) {
      set({ propertyStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ isloading: false });
    }
  },
  //get recommendations
  getRecommendations: async () => {
    set(() => ({ isloading: true }));
    try {
      const res = await api.getRecommendations();
      set({ propertyStatus: await res.status });
      set({ recommendations: await res.data.data});
    } catch (err) {
      set({ propertyStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ isloading: false });
    }
  },
  // sell property api call
  sellProperty: async (id,price) => {
    set(() => ({ isloading: true }));
    try {
      const res = await api.sellProperty(id,price);
      set({ propertyStatus: await res.status });
    } catch (err) {
      set({ propertyStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ isloading: false });
    }
  },
  // addImages to properties api call
  addImages: async (images) => {
    set(() => ({ isloading: true }));
    try {
      const res = await api.postMultipleImages(images);
      set({ propertyStatus: await res.status });
    } catch (err) {
      set({ propertyStatus: await err.response.status });
      console.error({ err });
    } finally {
      set({ isloading: false });
    }
  },
  deleteEverything: () =>
    // default
    set({
      realEstates: [],
      property: [],
      propertyStatus: null,
    }),
});

const realestatesStore = create(devtools(store));

export default realestatesStore;
