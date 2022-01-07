import create from 'zustand';
import { devtools } from 'zustand/middleware';

import api from '../api/api';

// gloabl states for the review
const store = (set) => ({
  allReviews: null,
  reviewStatus: null,
  loading: null,
  singleReview: null,
  // all reviews api call
  setAllReviews: async () => {
    set({ loading: true });
    try {
      const res = await api.getReviewProperties();
      set({ allReviews: await res.data.data });
      set({ reviewStatus: await res.status });
    } catch (err) {
      set({ reviewStatus: await err.response?.status });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
  // single review api call
  setSingleReview: async (id) => {
    set({ loading: true });
    try {
      const res = await api.getReviewProperty(id);
      set({ singleReview: await res.data.data });
      set({ reviewStatus: await res.status });
    } catch (err) {
      set({ reviewStatus: await err.response?.status });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
  // evaluate review api call
  evaluateReview: async (id, data) => {
    set({ loading: true });
    try {
      const res = await api.evaluateProperty(id, data);
      set({ reviewStatus: await res.status });
    } catch (err) {
      set({ reviewStatus: await err.response?.status });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
  deleteEverything: () =>
    // default
    set({
      reviewStatus: null,
    }),
});

const reviewsStore = create(devtools(store));

export default reviewsStore;
