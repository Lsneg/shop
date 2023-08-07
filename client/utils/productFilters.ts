import { ICatalogItem } from "store/catalog";
import { IFilters } from "~/store/selectedFilters";

export const productFilters = (
  productCatalog: ICatalogItem[],
  filters: IFilters
) => {
  return productCatalog
    .filter((product) => {
      if (filters.selectedBrands.length === 0) {
        return true;
      }
      return filters.selectedBrands.includes(product.brand);
    })
    .filter((product) => {
      const selectedYears = Object.values(filters.selectedYears);

      if (selectedYears.length === 0) {
        return true;
      }

      return selectedYears.includes(product.year.toString());
    })
    .filter((product) => {
      if (filters.selectedStore.length === 0) {
        return true;
      }

      const selectedStoresArray = Object.values(filters.selectedStore);

      return selectedStoresArray.some((store) => {
        return product.stocks[store] && product.stocks[store].productCount > 0;
      });
    })
    .sort((a, b) => {
      if (filters.sortBy === "ASC") {
        return a.brand_name.localeCompare(b.brand_name);
      } else {
        return b.brand_name.localeCompare(a.brand_name);
      }
    });
};
