import create from 'zustand';
import { devtools } from 'zustand/middleware';

//global states for filter
const store = (set) => ({
  query: '',
  setQuery: (query) => set({ query }),
  //filtering
  isCheckedBalcony: false,
  isCheckedGarden: false,
  isCheckedGarage: false,
  isCheckedInternet: false,
  isCheckedFurnished: false,
  //search elements
  element: 0,
  //sorting
  sort: 0,
  price: [0, 1000000],
  area: [0, 5000],
  offerMethod: '',
  //filtering
  SetIsCheckedBalcony: (isCheckedBalcony) => set({ isCheckedBalcony }),
  SetIsCheckedGarden: (isCheckedGarden) => set({ isCheckedGarden }),
  SetIsCheckedGarage: (isCheckedGarage) => set({ isCheckedGarage }),
  SetIsCheckedInternet: (isCheckedInternet) => set({ isCheckedInternet }),
  SetIsCheckedFurnished: (isCheckedFurnished) => set({ isCheckedFurnished }),
  setOfferMethod: (offerMethod) => set({ offerMethod }),
  setShowRoomNo: (showRoomNo) => set({ showRoomNo }),
  setShowInternetSpeed: (showInternetSpeed) => set({ showInternetSpeed }),
  //search Elements
  setElement: (element) => set({ element }),
  //sorting
  setSort: (sort) => set({ sort }),
  setPrice: (price) => set({ price: [price[0], price[1]] }),
  setArea: (area) => set({ area: [area[0], area[1]] }),
  deleteEverything: () =>
    // sets everything back to default
    set({
      query: '',
      isCheckedBalcony: false,
      isCheckedGarden: false,
      isCheckedGarage: false,
      isCheckedInternet: false,
      isCheckedFurnished: false,
      price: [0, 1000000],
      area: [0, 5000],
      sort: '',
      offerMethod: '',
    }),
});

const filterStore = create(devtools(store));

export default filterStore;
