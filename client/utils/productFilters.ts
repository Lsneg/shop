import { ICatalogItem } from "store/catalog";
import { IFilters } from "~/store/selectedFilters";

export const productFilters = (
  productCatalog: ICatalogItem[],
  filters: IFilters
) => {
  return productCatalog
    .filter((product) => {
      /* сортировка по бренду */
      if (filters.selectedBrands.length === 0) {
        return true;
      }
      return filters.selectedBrands.includes(product.brand);
    })
    .filter((product) => {
      /* сортировка по году */
      const selectedYears = Object.values(filters.selectedYears);

      if (selectedYears.length === 0) {
        return true;
      }

      return selectedYears.includes(product.year.toString());
    })
    .filter((product) => {
      /* сортировка по магазину */
      if (filters.selectedStock.length === 0) {
        return true;
      }

      const selectedStockArray = Object.values(filters.selectedStock);

      return selectedStockArray.some((store) => {
        return product.stocks[store] && product.stocks[store].productCount > 0;
      });
    })
    .sort((a, b) => {
      /* сортировка по ниименованию */
      if (filters.sortBy === "ASC") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
};
