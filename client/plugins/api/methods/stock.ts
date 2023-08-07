import { ApiFunction, config } from "../../api";

export const getStock = async () => {
  const api = useNuxtApp().$api as ApiFunction;
  return await api(`${config.api}/stock`, { method: "GET" });
};
