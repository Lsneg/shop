export const normalizeStockFilters = (dataArray: any[]) => {
  let addedStores: Set<string> = new Set();

  dataArray.forEach((data) => {
    Object.keys(data).forEach((key) => {
      if (key.startsWith("st") && data[key] !== 0) {
        addedStores.add(key);
      }
    });
  });

  const result = Array.from(addedStores).map((key) => {
    const storeNumber = key.replace("st", "");
    return {
      id: key,
      name: `Store ${storeNumber}`,
    };
  });

  return result;
};
