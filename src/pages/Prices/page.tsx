import React, { FC, useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { PricesModule } from '@pages/Prices/index';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PositionsTable from '@pages/Prices/components/PositionsTable';
import LoadingCircularProgress from '../../components/LoadingCircularProgress';

const PricesPage: FC = () => {
  const { store, service } = useContext(PricesModule.Context);
  const { fetch, data, selectedPriceData } = store;

  useEffect(() => {
    fetch.setLoading();

    const fetchData = async (): Promise<void> => {
      const resPrices = await service.getPrices();
      const resProducts = await service.getProducts();

      const pricesIds = resPrices.map((item) => item.id);
      const positionsArrayed = await Promise.all(pricesIds.map((id) => service.getPositions(id)));
      const resPositions = positionsArrayed.reduce((acc, cur) => [...acc, ...cur], []);

      store.commit({ prices: resPrices, positions: resPositions, products: resProducts, selectedPrice: resPrices[0].id });
    };

    fetchData()
      .then(() => {
        fetch.setDone();
      })
      .catch((reason) => {
        fetch.setFailed(reason);
      });
  }, [fetch, service, store]);

  if (!fetch.isInitialized) {
    return <LoadingCircularProgress />;
  }

  const tabs = (
    <Paper square>
      <Tabs
        value={store.state.selectedPrice}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_ev, selectedPrice): void => {
          store.commit({ selectedPrice });
        }}
      >
        {data.map((price) => (
          <Tab key={price.id} label={price.title} value={price.id} />
        ))}
      </Tabs>
    </Paper>
  );

  const content = selectedPriceData ? (
    <Box paddingTop="24px">
      <PositionsTable positions={selectedPriceData.positions} products={selectedPriceData.products} />
    </Box>
  ) : (
    <Typography>Woo... Something went wrong</Typography>
  );

  return (
    <>
      {tabs}
      {content}
    </>
  );
};

export default observer(PricesPage);
