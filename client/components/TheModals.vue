<template>
  <div :class="$style.modal" v-if="isOpen">
    <div :class="$style.modalWrapper" v-if="products">
      <div :class="$style.modalHeader">
        <h2 :class="$style.modalTitle">Order Product</h2>
        <button :class="$style.closeButton" @click="closeModal">✕</button>
      </div>

      <div :class="$style.modalContent">
        <!-- Total Price Section -->
        <div :class="$style.section">
          <span :class="$style.label">Total:</span>
          <span :class="$style.total" v-if="currency === 'EUR'">{{
            (products.price * quantity[selected]).toFixed(2)
          }}</span>
          <span :class="$style.total" v-if="currency === 'RUB'">{{
            (products.price * quantity[selected] * currenciesRub).toFixed(2)
          }}</span>
        </div>

        <!-- Quantity of products in store -->
        <div :class="$style.section">
          <span :class="$style.label">Products in Store:</span>
          <span :class="$style.total">{{
            products.stocks[selected]?.productCount
          }}</span>
        </div>

        <!-- Quantity Selector -->
        <div :class="$style.section">
          <span :class="$style.label">Quantity:</span>
          <div :class="$style.quantityControls">
            <button :class="$style.decrement" @click="decrementQuantity">
              -
            </button>
            <span :class="$style.quantityValue">{{ quantity[selected] }}</span>
            <button :class="$style.increment" @click="incrementQuantity">
              +
            </button>
          </div>
        </div>

        <!-- Store Selector -->
        <div :class="$style.section">
          <label :class="$style.label" for="storeSelect">Select Store:</label>
          <select
            :class="$style.storeSelect"
            id="storeSelect"
            @change="selectedStock"
          >
            <option
              v-for="(store, key) in products?.stocks"
              :value="key"
              :key="store.stockName"
            >
              {{ store.stockName }}
            </option>
          </select>
        </div>

        <button :class="$style.buyButton" @click="buyButton">Buy Now</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
interface IStock {
  stockName: string;
  productCount: number;
}

interface IProduct {
  price: number;
  stocks: Record<string, IStock>;
}

import { useCurrenciesStore } from "~/store/currencies";
import { ref, computed, watch } from "vue";
import { useFiltersStore } from "~/store/selectedFilters";

export default {
  setup() {
    const isOpen = computed<boolean>(
      () => useFiltersStore()?.filters?.modal?.isOpen
    );

    const products = computed<IProduct | null>(() => {
      return useFiltersStore().filters.modal.products;
    });

    const currency = computed<string>(() => useFiltersStore().filters.currency);

    const currenciesRub = computed(
      () => useCurrenciesStore().currenciesData.RUB
    );

    const quantity = ref<Record<string, number>>({});
    const selected = ref("");

    watch(products, (newVal) => {
      if (newVal && newVal.stocks) {
        selected.value = Object.keys(newVal.stocks)[0] || "";

        for (const storeKey in newVal.stocks) {
          if (!quantity.value[storeKey]) {
            quantity.value[storeKey] = 1;
          }
        }
      }
    });

    const incrementQuantity = () => {
      if (
        products.value &&
        products.value.stocks[selected.value].productCount >
          quantity.value[selected.value]
      ) {
        quantity.value[selected.value]++;
      }
    };

    const decrementQuantity = () => {
      if (
        quantity.value[selected.value] &&
        quantity.value[selected.value] > 1
      ) {
        quantity.value[selected.value]--;
      }
    };

    const selectedStock = (event: Event) => {
      if (event.target instanceof HTMLSelectElement) {
        selected.value = event.target.value;
      }
    };

    const closeModal = () => {
      quantity.value = {};
      selected.value = "";
      useFiltersStore().updateFilters({
        modal: {
          isOpen: false,
          products: null,
        },
      });
    };

    const buyButton = () => {
      quantity.value = {};
      selected.value = "";
      useFiltersStore().updateFilters({
        modal: {
          isOpen: false,
          products: null,
        },
      });
    };

    return {
      quantity,
      closeModal,
      isOpen,
      products,
      selected,
      selectedStock,
      decrementQuantity,
      incrementQuantity,
      buyButton,
      currency,
      currenciesRub,
    };
  },
};
</script>

<style module>
h2 {
  margin: 0;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modalContent {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 80%;
  max-width: 500px;
}

.section {
  margin-bottom: 20px;
}

.label {
  font-weight: bold;
  margin-right: 10px;
}

.quantityControls {
  display: inline-flex;
  align-items: center;
}

.decrement,
.increment {
  background: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
}

.quantityValue {
  padding: 5px 20px;
}

.storeSelect {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
}

.buyButton {
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.buyButton:hover {
  background-color: #0056b3;
}

.modalWrapper {
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.modalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.closeButton {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #aaa;
  transition: color 0.3s;
  padding: 0;
  margin: 0;
}

.closeButton:hover {
  color: #777;
}
</style>
