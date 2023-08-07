<template>
  <div>
    <div>
      <div>
        {{ console.log(selected, "selected") }}
        <select name="sort" id="sort" :value="selected" @change="selectedFn">
          <option value="ASC">Title (A to Z)</option>
          <option value="DESC">Title (Z to A)</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useFiltersStore } from "~/store/selectedFilters";

export default defineComponent({
  setup() {
    const filterStore = useFiltersStore();

    const selected = computed(() => filterStore.filters.sortBy);

    const selectedFn = (event: Event) => {
      const target = event.target as HTMLSelectElement;

      filterStore.updateFilters({
        sortBy: target.value as "ASC" | "DESC",
      });
    };

    return {
      selectedFn,
      selected,
    };
  },
});
</script>
