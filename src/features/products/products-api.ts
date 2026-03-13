import { baseApi } from '@/api/base-api';

import { GetProductsParams, ProductsApiResponse } from './types/products';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsApiResponse, GetProductsParams | void>({
      query: (params) => {
        const { limit, skip, sortBy, order, search } = params || {};

        const select = 'title,category,price,brand,sku,rating';

        const baseUrl = search ? 'products/search' : 'products';
        const queryString = new URLSearchParams({
          limit: limit?.toString() ?? '20',
          skip: skip?.toString() ?? '0',
          select,
          ...(sortBy && { sortBy }),
          ...(order && { order }),
          ...(search && { q: search }),
        }).toString();

        return {
          url: `${baseUrl}?${queryString}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
