import create from 'zustand';
import { devtools } from 'zustand/middleware';

// gloabl states for the image upload
let store = (set) => ({
  files: [],
  // set files from image upload
  setFiles: (file) => {
    set(() => ({ files: file }));
  },
});

store = devtools(store);

const imageStore = create(devtools(store));

export default imageStore;
