import { fetchProducts } from '../api/products';

// Mock manual de fetch
global.fetch = jest.fn();

describe('fetchProducts', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('devuelve resultados si la respuesta es 200 OK', async () => {
    const fake = [{ productId: '1' }];
    const mockResponse = {
      ok: true,
      json: async () => ({ data: { results: fake } }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    const result = await fetchProducts();
    expect(result).toEqual(fake);
  });

  it('lanza error si la respuesta no es 200', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      text: async () => 'Not Found',
    };
    fetch.mockResolvedValueOnce(mockResponse);

    await expect(fetchProducts()).rejects.toThrow('HTTP 404: Not Found');
  });

  it('lanza error si el JSON está malformado', async () => {
    const mockResponse = {
      ok: true,
      json: async () => {
        throw new Error('bad json');
      },
    };
    fetch.mockResolvedValueOnce(mockResponse);

    await expect(fetchProducts()).rejects.toThrow('bad json');
  });

  it('usa valores por defecto cuando no se pasan parámetros', async () => {
    const fake = [{ productId: '1' }];
    const mockResponse = {
      ok: true,
      json: async () => ({ data: { results: fake } }),
    };
    fetch.mockResolvedValueOnce(mockResponse);

    await fetchProducts();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('categoryId=cat1210001')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('currentpage=1')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('zoneId=1')
    );
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('priceGroup=10')
    );
  });
});