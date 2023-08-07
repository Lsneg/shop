import { defineStore } from "pinia";
import { getStock } from "../plugins/api/methods/stock";
import { ref } from "vue";

export interface Stock {
  art: string;
  st1: string;
  st2: string;
}

export const useStockStore = defineStore("stockStore", () => {
  const loader = ref(false);
  const stockData: Ref<Stock[]> = ref([]);

  const getStockData = async () => {
    const stock = await getStock();
    stockData.value = stock;
  };

  return {
    loader,
    stockData,
    getStockData,
  };
});
