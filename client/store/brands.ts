import { defineStore } from "pinia";
import { getBrands } from "~/plugins/api/methods/brands";
import { ref } from "vue";

export interface Brand {
  id: number;
  name: string;
}

export const useBrandsStore = defineStore("brandsStore", () => {
  const loader = ref(false);
  const brandsData: Ref<Brand[]> = ref([]);

  const getBrandsData = async () => {
    const brands = await getBrands();
    brandsData.value = brands;
  };

  return {
    loader,
    brandsData,
    getBrandsData,
  };
});
