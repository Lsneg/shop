import { ApiFunction, config } from "../../api";

export const getCurrencies = async () => {
  const api = useNuxtApp().$api as ApiFunction;
  const key = import.meta.env.VITE_EXCHANGE_RATES_API_KEY;
  console.log(import.meta.env.VITE_EXCHANGE_RATES_API_KEY);

  return await api(
    `${config.currencies}?access_key=${key}&base=EUR&symbols=RUB`,
    {
      method: "GET",
    }
  );
};
