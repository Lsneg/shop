<template>
  <div :class="$style.pagination">
    <button @click="goToPage(1)" :disabled="currentPage === 1">&lt;&lt;</button>
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
      &lt;
    </button>
    <span>{{ currentPage }} of {{ totalPages }}</span>
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
    >
      &gt;
    </button>
    <button
      @click="goToPage(totalPages)"
      :disabled="currentPage === totalPages"
    >
      &gt;&gt;
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useFiltersStore } from "~/store/selectedFilters";
import { MAX_ITEMS_PER_PAGE } from "~/constants/pagination";

export default defineComponent({
  setup() {
    const filterStore = useFiltersStore();

    const currentPage = computed(
      () => filterStore.filters.currentPagePagination
    );

    const totalPages = computed(() => {
      return Math.ceil(filterStore.filters.lengthPage / MAX_ITEMS_PER_PAGE);
    });

    const goToPage = (page: number) => {
      if (page >= 1 && page <= totalPages.value) {
        filterStore.updateFilters({
          currentPagePagination: page,
        });
      }
    };
    return {
      currentPage,
      totalPages,
      goToPage,
    };
  },
});
</script>

<style module>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination button {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 16px;
  padding: 5px;
  margin: 0 10px;
  color: #ccc;
}

.pagination button:disabled {
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
}
</style>
