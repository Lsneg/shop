import { defineStore } from "pinia";
import { getCurrencies } from "../plugins/api/methods/currencies";
import { ref } from "vue";

interface Currencies {
  RUB: number;
}

export const useCurrenciesStore = defineStore("currenciesStore", () => {
  const currenciesData: Ref<Currencies> = ref({
    RUB: 1,
  });

  const getCurrenciesData = async () => {
    const currencies = await getCurrencies();
    currenciesData.value.RUB = currencies.rates.RUB;
  };

  return {
    currenciesData,
    getCurrenciesData,
  };
});
