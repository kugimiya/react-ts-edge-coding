export type PriceDto = {
  id: string;
  name: string;
};

export type ProductDto = {
  id: string;
  name: string;
  article: string;
  code: string;
  time: string;
  role_ids: string[];
};

export type PositionDto = {
  id: string;
  price_id: string;
  product_id: string;
  price: string;
};

export type Price = {
  id: number;
  title: string;
};

export type Product = {
  id: number;
  title: string;
  codeArticle: string;
  code: string;
  time: number;
  roleIds: number[];
};

export type Position = {
  id: number;
  priceId: number;
  productId: number;
  price: number;
};
