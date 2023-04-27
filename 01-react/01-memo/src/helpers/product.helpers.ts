import type { Product } from "@/models";

export const getUpdated = (id: string, products: Product[]): Product[] =>
  products.map((product) =>
    product.id === id ? { ...product, fav: !product.fav } : product
  );

let filteredCount = 0;

const updateFilteredCount = () => {
  const filteredCountElement = document.getElementById("filtered-count");
  filteredCountElement?.style.setProperty("display", "flex");

  filteredCount++;
  const countElement = document.getElementById("count") as HTMLSpanElement;
  countElement.textContent = filteredCount.toString();
};

export const getFiltered = (
  products: Product[],
  visibility: string
): Product[] => {
  updateFilteredCount();
  switch (visibility) {
    case "fav":
      return products.filter((product) => product.fav);
    case "unfav":
      return products.filter((product) => !product.fav);
    default:
      return products;
  }
};
