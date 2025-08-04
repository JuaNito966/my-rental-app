export async function fetchProducts(params = {}) {
  const BASE = process.env.REACT_APP_SERVICE_PRODUCTS_BASE_URL;
  
  const safeParams = params || {};
  
  const {
    categoryId = 'cat1210001',
    currentpage = 1,
    zoneId = 1,
    priceGroup = 10,
    sortBy = '_score,desc',
  } = safeParams;

  const url = `${BASE}/soco/category/products`
    + `?categoryId=${categoryId}`
    + `&currentpage=${currentpage}`
    + `&zoneId=${zoneId}`
    + `&priceGroup=${priceGroup}`
    + `&sortBy=${encodeURIComponent(sortBy)}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  const json = await res.json();
  return json.data.results;
}