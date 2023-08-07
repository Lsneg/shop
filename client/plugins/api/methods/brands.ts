import { ApiFunction, config } from "../../api";

export const getBrands = async () => {
  const api = useNuxtApp().$api as ApiFunction;
  return await api(`${config.api}/brands`, { method: "GET" });
};
