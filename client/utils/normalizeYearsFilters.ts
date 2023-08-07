export const normalizeYears = (dataArray: any[]) => {
  const uniqueYearsMap: Map<string, { id: string; name: string }> = new Map();

  dataArray.forEach((item) => {
    if (item.year && !uniqueYearsMap.has(item.year.toString())) {
      uniqueYearsMap.set(item.year.toString(), {
        id: item.year.toString(),
        name: item.year.toString(),
      });
    }
  });

  const sortedYears = Array.from(uniqueYearsMap.values()).sort(
    (a, b) => parseInt(a.id) - parseInt(b.id)
  );

  return sortedYears;
};
