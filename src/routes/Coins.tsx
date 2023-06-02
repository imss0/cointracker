import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
const CoinsList = styled.ul``;
const Coin = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 15px;
    transition: background-color 0.2s ease-in;
  }
  border-radius: 15px;
  margin: 10px;
  &:hover {
    a {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const data = await (
        await fetch("https://api.coinpaprika.com/v1/coins")
      ).json();
      setCoins(data.slice(0, 100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <ImgContainer>
                  <Img
                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  />
                  {coin.name}
                </ImgContainer>
                <div>➔</div>{" "}
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
