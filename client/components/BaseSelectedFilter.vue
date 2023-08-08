<template>
  <div :class="$style.companyName">
    <div :class="$style.titleBox">
      <h2>{{ title }}</h2>
    </div>

    <div :class="$style.multiselect">
      <div
        v-for="item in data"
        :key="item.id"
        :class="selectedData.includes(item.id) ? $style.selected : ''"
        @click="toggleSelection(item.id)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Array as () => Array<{ id: number | string; name: string }>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedData = computed(() => {
      return props.filters;
    });

    const toggleSelection = (companyId: number | string) => {
      let updatedFilters;

      if (selectedData.value.includes(companyId)) {
        updatedFilters = selectedData.value.filter((id) => id !== companyId);
      } else {
        updatedFilters = [...selectedData.value, companyId];
      }

      emit("onSelect", updatedFilters);
    };

    return {
      selectedData,
      toggleSelection,
    };
  },
});
</script>

<style module>
.companyName {
  margin-bottom: 16px;
}

.titleBox {
  display: flex;
}

.multiselect {
  margin: 0 auto;
  padding: 0;
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
}

.multiselect div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  padding: 0 8px;
  cursor: pointer;
  color: #ccc;
  background-color: #fff;
  transition: all 0.3s ease;
}

.multiselect div:hover {
  background-color: #0063b4;
  color: #fff;
}

.multiselect div span {
  margin-left: 8px;
}

.multiselect div span:hover {
  color: #fff;
}

.multiselect div.selected {
  background-color: #0063b4;
  color: #fff;
}
</style>
