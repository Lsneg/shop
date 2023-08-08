<template>
  <div>
    <div :class="$style.clear" @click="clear">Clear All</div>
  </div>
  <BaseSelectedFilter
    :data="companies"
    :filters="filters.selectedBrands"
    :title="'Brands'"
    @onSelect="selectedCompanies"
  />
  <BaseSelectedFilter
    :data="years"
    :filters="filters.selectedYears"
    :title="'Years'"
    @onSelect="selectedYears"
  />
  <BaseSelectedFilter
    :data="stock"
    :title="'Store'"
    :filters="filters.selectedStock"
    @onSelect="selectedStock"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useFiltersStore } from "~/store/selectedFilters";

export default defineComponent({
  props: {
    companies: {
      type: Array as () => Array<{ id: number; name: string }>,
      required: true,
    },
    years: {
      type: Array as () => Array<{ id: string; name: string }>,
      required: true,
    },
    stock: {
      type: Array as () => Array<{ id: number; name: string }>,
      required: true,
    },
  },
  setup() {
    const filterStore = useFiltersStore();
    const filters = computed(() => {
      return filterStore.filters;
    });

    const selectedCompanies = (companies = []) => {
      filterStore.updateFilters({
        currentPagePagination: 1,
        selectedBrands: companies,
      });
    };

    const selectedYears = (years = []) => {
      filterStore.updateFilters({
        currentPagePagination: 1,
        selectedYears: years,
      });
    };

    const selectedStock = (stock = []) => {
      filterStore.updateFilters({
        currentPagePagination: 1,
        selectedStock: stock,
      });
    };

    const clear = () => {
      filterStore.updateFilters({
        currency: "RUB",
        selectedBrands: [],
        selectedYears: [],
        selectedStock: [],
        sortBy: "ASC",
        currentPagePagination: 1,
        lengthPage: 0,
      });
    };

    return {
      selectedCompanies,
      selectedYears,
      selectedStock,
      clear,
      filters,
    };
  },
});
</script>

<style module>
.clear {
  position: absolute;
  cursor: pointer;
  color: #0063b4;
  font-size: 14px;
  left: 200px;
  top: 123px;
}
</style>
