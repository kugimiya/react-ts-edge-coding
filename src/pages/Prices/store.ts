import { Position, Price, Product } from '@models/Prices';
import { BaseStore, FetchStore } from '@sdk/index';
import { computed } from 'mobx';

type PricesStoreState = {
  prices: Price[];
  products: Product[];
  positions: Position[];
  selectedPrice: Price['id'] | null;
};

type MappedPrice = Price & {
  products: Product[];
  positions: Position[];
};

export default class PricesStore extends BaseStore<PricesStoreState> {
  constructor(readonly fetch: FetchStore) {
    super(
      {
        prices: [],
        products: [],
        positions: [],
        selectedPrice: null,
      },
      'PricesStore',
    );
  }

  @computed
  get data(): MappedPrice[] {
    return this.state.prices.map((price) => ({
      ...price,
      products: this.state.products,
      positions: this.state.positions.filter((position) => position.priceId === price.id),
    }));
  }

  @computed
  get selectedPriceData(): MappedPrice | undefined {
    return this.data.find((price) => price.id === this.state.selectedPrice);
  }
}
