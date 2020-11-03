import { PageModule } from '@sdk/page';
import PricesStore from '@pages/Prices/store';
import PricesService from '@pages/Prices/service';
import PricesPage from '@pages/Prices/page';
import { FetchStore } from '@sdk/index';
import ApiInstance from '../../api/ApiInstance';

export const PricesModule = PageModule<PricesStore, PricesService>({
  path: '/prices',
  component: PricesPage,
  store: [PricesStore, [{ ClassName: FetchStore, Args: ['PricesFetchStore'] }]],
  service: [PricesService, [{ ClassName: ApiInstance, DontCreate: true }]],
});
