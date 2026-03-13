export interface ProductFromApi {
  id: number;
  title: string;
  category: string;
  price: number;
  brand?: string;
  sku: string;
  rating: number;
}

export interface ProductsApiResponse {
  products: ProductFromApi[];
  total: number;
  skip: number;
  limit: number;
}

export interface GetProductsParams {
  skip?: number;
  limit?: number;
  sortBy?: string;
  order?: string;
}
