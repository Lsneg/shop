import { defineStore } from "pinia";
import { ref } from "vue";

export interface IFilters {
  currency: string;
  selectedBrands: number[];
  selectedYears: string[];
  selectedStock: string[];
  sortBy: "ASC" | "DESC";
  currentPagePagination: number;
  lengthPage: number;
  modal: {
    isOpen: boolean;
    products: {
      id: number;
      name: string;
      art: string;
      brand: number;
      brand_name: string;
      price: number;
      year: string;
      stocks: {
        [key: string]: {
          productCount: number;
          stockName: string;
        };
      };
    } | null;
  };
}

export const useFiltersStore = defineStore("filtersStore", () => {
  const filters = ref<IFilters>({
    currency: "RUB",
    selectedBrands: [],
    selectedYears: [],
    selectedStock: [],
    sortBy: "ASC",
    currentPagePagination: 1,
    lengthPage: 0,
    modal: {
      isOpen: false,
      products: null,
    },
  });

  const updateFilters = (newFilters: Partial<IFilters>) => {
    filters.value = {
      ...filters.value,
      ...newFilters,
    };
  };

  return {
    filters,
    updateFilters,
  };
});
