<template>
  <div :class="$style.companyName">
    <div :class="$style.titleBox">
      <h2>{{ title }}</h2>
    </div>

    <div :class="$style.multiselect">
      <div
        v-for="company in companies"
        :key="company.id"
        :class="selectedCompanies.includes(company.id) ? $style.selected : ''"
        @click="toggleSelection(company.id)"
      >
        {{ company.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    companies: {
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
    const selectedCompanies = computed(() => {
      return props.filters;
    });

    const toggleSelection = (companyId: number | string) => {
      let updatedFilters;

      // Если компания уже выбрана, удаляем ее из списка
      if (selectedCompanies.value.includes(companyId)) {
        updatedFilters = selectedCompanies.value.filter(
          (id) => id !== companyId
        );
      } else {
        // Иначе добавляем компанию в список выбранных
        updatedFilters = [...selectedCompanies.value, companyId];
      }

      // Отправляем обновленный список в родительский компонент
      emit("onSelect", updatedFilters);
    };

    return {
      selectedCompanies,
      toggleSelection,
      // clear,
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
