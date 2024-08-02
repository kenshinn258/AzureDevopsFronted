import { defineStore, acceptHMRUpdate } from "pinia";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

function store() {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const isMatchLG = breakpoints.greaterOrEqual("lg");
  return {
    isMatchLG,
  };
}

export const useGlobalStore = defineStore("global", store);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot));
}
