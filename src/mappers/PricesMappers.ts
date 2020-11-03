import { morphism, StrictSchema } from 'morphism';

import { Position, PositionDto, Price, PriceDto, Product, ProductDto } from '@models/Prices';

export const pricesMapper = (dto: PriceDto[]): Price[] => {
  const schema: StrictSchema<Price, PriceDto> = {
    id: (iteratee) => Number(iteratee.id),
    title: (iteratee) => iteratee.name,
  };

  return dto.map((item) => morphism(schema, item));
};

export const positionsMapper = (dto: PositionDto[]): Position[] => {
  const schema: StrictSchema<Position, PositionDto> = {
    id: (iteratee) => Number(iteratee.id),
    priceId: (iteratee) => Number(iteratee.price_id),
    productId: (iteratee) => Number(iteratee.product_id),
    price: (iteratee) => Number(iteratee.price),
  };

  return dto.map((item) => morphism(schema, item));
};

export const productsMapper = (dto: ProductDto[]): Product[] => {
  const schema: StrictSchema<Product, ProductDto> = {
    id: (iteratee) => Number(iteratee.id),
    time: (iteratee) => Number(iteratee.time),
    code: (iteratee) => iteratee.code,
    codeArticle: (iteratee) => iteratee.article,
    title: (iteratee) => iteratee.name,
    roleIds: (iteratee) => iteratee.role_ids.map((roleId) => Number(roleId)),
  };

  return dto.map((item) => morphism(schema, item));
};
