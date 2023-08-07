import { defineStore } from "pinia";
import { getCatalog } from "../plugins/api/methods/catalog";
import { useBrandsStore } from "./brands";
import { useStockStore } from "./stock";
import { ref } from "vue";

export interface ICatalogItem {
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
}

type StockItem = {
  art: string;
  st1: string;
  st2: string;
  [key: string]: string;
};

export const useCatalogStore = defineStore("catalogStore", () => {
  const brandsStore = useBrandsStore();
  const stockStore = useStockStore();
  const loader = ref(false);
  const catalogData = ref<ICatalogItem[]>([]);

  const getCatalogData = async () => {
    await brandsStore.getBrandsData();
    await stockStore.getStockData();

    const brands = await brandsStore.brandsData;
    const stock = await stockStore.stockData;
    const catalog = await getCatalog();

    const catalogWithBrandName = catalog.map((item: ICatalogItem) => {
      const brand = brands.find((brand) => brand.id === item.brand);
      return {
        ...item,
        brand_name: brand?.name,
      };
    });

    const catalogWithStock = catalogWithBrandName.map((item: ICatalogItem) => {
      const stockItem: StockItem | undefined = stock.find(
        (stockItem) => stockItem.art === item.art
      );
      if (stockItem) {
        const stockItemKeys = Object.keys(stockItem);
        const stocks = stockItemKeys.reduce<{
          [key: string]: { productCount: number; stockName: string };
        }>((acc, key) => {
          if (key !== "art") {
            acc[key] = {
              productCount: parseInt(stockItem[key], 10),
              stockName: `Stock ${key.replace("st", "")}`,
            };
          }
          return acc;
        }, {});

        return {
          ...item,
          stocks,
        };
      }
    });

    catalogData.value = catalogWithStock;
  };

  return {
    loader,
    catalogData,
    getCatalogData,
  };
});
