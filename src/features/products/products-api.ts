import { baseApi } from '@/api/base-api';

import { GetProductsParams, ProductsApiResponse } from './types/products';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsApiResponse, GetProductsParams | void>({
      query: (params) => {
        const { limit, skip, sortBy, order } = params || {};

        const select = 'title,category,price,brand,sku,rating';

        return {
          url: `products?limit=${limit?.toString() ?? '20'}&skip=${skip?.toString() ?? '0'}&select=${select}&sortBy=${sortBy}&order=${order}`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
