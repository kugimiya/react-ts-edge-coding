import { ApiRequest } from '@sdk/index';
import { AuthDto } from '@models/Auth';
import { Position, PositionDto, Price, PriceDto, Product, ProductDto } from '@models/Prices';
import { Request } from '@models/Request';
import { positionsMapper, pricesMapper, productsMapper } from '../../mappers/PricesMappers';

export default class PricesService {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly apiInstance: ApiRequest<AuthDto>) {}

  async getPrices(): Promise<Price[]> {
    const response = await this.apiInstance.request<Request<{ prices: PriceDto[] }>>({
      url: '/api/prices/prices',
    });

    return pricesMapper(response.data.payload.prices);
  }

  async getPositions(priceId: number): Promise<Position[]> {
    const response = await this.apiInstance.request<Request<{ positions: PositionDto[] }>>({
      url: '/api/prices/positions',
      // eslint-disable-next-line @typescript-eslint/camelcase
      params: { price_id: priceId },
    });

    return positionsMapper(response.data.payload.positions);
  }

  async getProducts(): Promise<Product[]> {
    const response = await this.apiInstance.request<Request<{ products: ProductDto[] }>>({
      url: '/api/prices/products',
      params: { extended: true },
    });

    return productsMapper(response.data.payload.products);
  }
}
