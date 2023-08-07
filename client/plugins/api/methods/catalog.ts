import { ApiFunction, config } from "../../api";

export const getCatalog = async () => {
  const api = useNuxtApp().$api as ApiFunction;
  return await api(`${config.api}/catalog`, { method: "GET" });
};
