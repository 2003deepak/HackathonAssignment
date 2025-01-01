import { create } from "zustand";

const PostTypeStore = create((set) => ({
  selectedPostType: null, 
  setSelectedPostType: (type) => set({ selectedPostType: type }),
}));

export default PostTypeStore;
