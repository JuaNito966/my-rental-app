// src/api/products.js
const BASE = process.env.REACT_APP_SERVICE_PRODUCTS_BASE_URL;

export async function fetchProducts(params = {}) {
  const {
    categoryId   = 'cat1210001',
    currentpage  = 1,
    zoneId       = 1,
    priceGroup   = 10,
    sortBy       = '_score,desc',
  } = params;

  const url = `${BASE}/soco/category/products`
    + `?categoryId=${categoryId}`
    + `&currentpage=${currentpage}`
    + `&zoneId=${zoneId}`
    + `&priceGroup=${priceGroup}`
    + `&sortBy=${encodeURIComponent(sortBy)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();

  const productsArray = Array.isArray(json.data?.results)
    ? json.data.results
    : [];

  return productsArray;
}
