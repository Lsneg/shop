<template>
  <div :class="$style.container">
    <header>
      <Logotype />
    </header>

    <main>
      <TheModals />
      <div>
        <div :class="$style.box">
          <div>counter: {{ counterPage }}</div>
          <div><CurrencySwitcher /></div>
          <div>
            <SortBy />
          </div>
        </div>
        <ProductCard :productCatalog="catalogStore.catalogData" />
      </div>
    </main>

    <aside>
      <TheAside :companies="companies" :years="years" :store="store" />
    </aside>

    <footer>
      <PagePagination />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useCatalogStore } from "~/store/catalog";
import { useBrandsStore, Brand } from "~/store/brands";
import { useStockStore } from "~/store/stock";
import { useFiltersStore } from "~/store/selectedFilters";
import { normalizeYears } from "~/utils/normalizeYearsFilters";
import { normalizeStockFilters } from "~/utils/normalizeStockFilters";

export default defineComponent({
  setup() {
    const catalogStore = useCatalogStore();
    const counterPage = computed(() => useFiltersStore().filters.lengthPage);

    const companies = ref<Brand[]>([]);
    const store = ref<any>([]);
    const years = ref<
      {
        id: string;
        name: string;
      }[]
    >([]);

    onMounted(async () => {
      await catalogStore.getCatalogData();
      companies.value = useBrandsStore().brandsData;

      years.value = normalizeYears(useCatalogStore().catalogData);
      store.value = normalizeStockFilters(useStockStore().stockData);
    });

    return {
      companies,
      years,
      store,
      catalogStore,
      counterPage,
    };
  },
});
</script>

<style module>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "aside main"
    "aside footer";
  grid-template-columns: 200px 3fr;
  grid-gap: 20px;
  margin: 16px auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.box {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

header {
  grid-area: header;
}

header h1 {
  font-size: 24px;
  font-weight: 700;
  color: #0063b4;
  text-align: center;
}

main {
  grid-area: main;
}

aside {
  grid-area: aside;
}

footer {
  grid-area: footer;
}
</style>
