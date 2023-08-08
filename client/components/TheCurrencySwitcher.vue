<template>
  <div>
    <div :class="$style.switcher">
      <div v-for="curr in currencies" :key="curr">
        <input
          type="radio"
          :id="curr"
          name="currency"
          :value="curr"
          v-model="selectedCurrency"
          @change="switchedCurrency"
        />
        <label :for="curr">{{ curr }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import { useCurrenciesStore } from "~/store/currencies";
import { useFiltersStore } from "~/store/selectedFilters";

export default defineComponent({
  setup() {
    const currenciesStore = useCurrenciesStore();
    onMounted(async () => {
      await currenciesStore.getCurrenciesData();
    });

    const filtersStore = useFiltersStore();

    // Suppose you have a getter in your store for this
    const selectedCurrency = ref(filtersStore.filters.currency);

    const switchedCurrency = () => {
      filtersStore.updateFilters({
        currency: selectedCurrency.value,
      });
    };

    const currencies = ["RUB", "EUR"];

    return {
      switchedCurrency,
      selectedCurrency,
      currencies,
    };
  },
});
</script>

<style module>
.switcher {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}
.switcher input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.switcher label {
  display: block;
  width: 100%;
  padding: 8px 0;
  width: 50px;
  text-align: center;
  cursor: pointer;
  color: #ccc;
  background-color: #fff;
  transition: all 0.3s ease;
}

.switcher input:checked + label {
  color: #fff;
  background-color: #0063b4;
}
</style>
