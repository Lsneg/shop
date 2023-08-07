<template>
  <div v-for="product in limitedProductCatalog" :key="product.id">
    <div :class="$style.productCard">
      <div :class="$style.nameArtWrapper">
        <div :class="$style.productName">
          наименование товара: {{ product.name }}
        </div>
        <div :class="$style.productArt">артикул: {{ product.art }}</div>
      </div>
      <div :class="$style.brandYearWrapper">
        <div :class="$style.productBrand">
          производитель: {{ product.brand_name }}
        </div>
        <div :class="$style.productYear">год выпуска: {{ product.year }}</div>
      </div>
      <div>
        <div v-for="(store, key) in product.stocks" :key="store.stockName">
          <div v-if="stockSelected.includes(String(key))">
            <div :class="$style.stock">
              <div>магазин: {{ store.stockName }}</div>
              <div>количество: {{ store.productCount }}</div>
            </div>
          </div>
          <div v-else-if="stockSelected.length === 0">
            <div :class="$style.stock">
              <div>магазин: {{ store.stockName }}</div>
              <div>количество: {{ store.productCount }}</div>
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.productPrice">
        <div v-if="filterCurrencies === 'RUB'">
          {{ (product.price * currenciesRub).toFixed(2) }} ₽
        </div>
        <div v-if="filterCurrencies === 'EUR'">{{ product.price }} €</div>
      </div>
      <button
        @click="addToCart(product)"
        :class="$style.addButton"
        :disabled="isButtonDisabled(product)"
      >
        Add to cart
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useFiltersStore } from "~/store/selectedFilters";
import { useCurrenciesStore } from "~/store/currencies";
import { MAX_ITEMS_PER_PAGE } from "~/constants/pagination";
import { ICatalogItem } from "store/catalog";

export default defineComponent({
  props: {
    productCatalog: {
      type: Array as () => Array<ICatalogItem>,
      required: true,
    },
  },
  setup(props) {
    const filterStore = useFiltersStore();
    const currenciesRub = computed(
      () => useCurrenciesStore().currenciesData.RUB
    );
    const filterCurrencies = computed(() => filterStore.filters.currency);
    const stockSelected = computed(() => filterStore.filters.selectedStore);

    const filteredProducts = computed(() => {
      return productFilters(props.productCatalog, filterStore.filters);
    });

    const limitedProductCatalog = computed(() => {
      filterStore.updateFilters({
        lengthPage: filteredProducts.value.length,
      });
      return filteredProducts.value.slice(
        filterStore.filters.currentPagePagination * MAX_ITEMS_PER_PAGE -
          MAX_ITEMS_PER_PAGE,
        MAX_ITEMS_PER_PAGE * filterStore.filters.currentPagePagination
      );
    });

    const addToCart = (product: any) => {
      useFiltersStore().updateFilters({
        modal: {
          isOpen: true,
          products: product,
        },
      });
    };

    return {
      limitedProductCatalog,
      addToCart,
      currenciesRub,
      filterCurrencies,
      stockSelected,
      isButtonDisabled: (product: ICatalogItem) => {
        let counter = 0;

        const cc = Object.values(product.stocks).some((store) => {
          if (store.productCount !== 0) {
            counter++;
          }
        });

        return counter === 0;
      },
    };
  },
});
</script>

<style module>
.productCard {
  display: grid;
  grid-template-rows: auto auto auto auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

.nameArtWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.productName,
.productArt {
  margin: 5px 0;
}

.brandYearWrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.productBrand,
.productYear {
  margin: 5px 0;
}

.productPrice {
  margin: 5px 0;
  font-weight: bold;
}

.addButton {
  width: 100%;
  height: 35px;
  border: 1px solid #0063b4;
  border-radius: 5px;
  color: #fff;
  background-color: #0063b4;
  cursor: pointer;
  margin: 5px 0;
  &:disabled {
    background-color: #ccc;
    color: #fff;
    border-color: #ccc;
  }
}

.addButton:hover {
  background-color: #0381e7;
  color: #fff;
  &:disabled {
    background-color: #ccc;
    border-color: #ccc;
  }
}

.addButton:active {
  background-color: #0063b4;
  color: #fff;
}

.stock {
  margin: 5px 0;
  background-color: #d1d1d1;
}
</style>
