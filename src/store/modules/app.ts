import { store } from "/@/store";
import { defineStore } from "pinia";

export const appStore = defineStore({
  id: "store-app",
  state: () => ({
    counter: 0
  }),
  getters: {
    addName: state => state.counter * 2
  },
  actions: {
    addCounter(value: number) {
      this.counter += value;
    }
  }
});

export const appStoreHooks = () => appStore(store);
