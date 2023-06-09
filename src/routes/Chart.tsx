import { useQuery } from "react-query";
import { getPrice } from "../api";
interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery(["history", coinId], () =>
    getPrice(coinId)
  );
  return <h1>CHART</h1>;
}

export default Chart;
