import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getPrice, getInfo } from "../api";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";

const Container = styled.div`
  padding: 10px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header``;
const Loader = styled.div`
  text-align: center;
  padding: 50px 0px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  text-align: center;
`;

const Tabs = styled.div`
  margin: 10px;
  justify-content: center;
  display: flex;
  max-width: 480px;
`;
const Tab = styled.div<{ isActive: boolean }>`
  background-color: ${(props) => props.theme.btnColor};
  padding: 15px;
  margin: 10px;
  width: 100px;
  text-align: center;
  border-radius: 10px;
  a {
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
  a:visited {
    color: ${(props) =>
      props.isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface Params {
  coinId: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<Params>();
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["priceData", coinId],
    () => getPrice(coinId)
  );
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["infoData", coinId],
    () => getInfo(coinId)
  );

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const isLoading = priceLoading || infoLoading;

  return (
    <Container>
      <Header>
        <Title>
          {priceData?.name
            ? priceData?.name
            : isLoading
            ? "Loading..."
            : infoData?.name}
        </Title>
      </Header>
      {isLoading ? <Loader>Loading...</Loader> : null}
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart </Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price </Link>
        </Tab>
      </Tabs>
      <Switch>
        <Route path={`/${coinId}/price`}>
          <Price />
        </Route>
        <Route path={`/${coinId}/chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
    </Container>
  );
}

export default Coin;
