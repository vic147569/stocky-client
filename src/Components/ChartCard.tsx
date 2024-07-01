import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useGetStockHistory } from '@/Api/StockApi';
import LineChart, { DataPoint } from './Chart';

const ChartCard = () => {
  const { symbol } = useParams();
  const { stockHistory, isLoading } = useGetStockHistory(symbol);
  const data = stockHistory?.price.map((item) => ({
    date: new Date(item.date),
    value: item.close,
  }));

  if (isLoading) {
    return <div>Loading</div>;
  }

  const themeColor = data!.at(-1)!.value > data![0].value ? '#22c55e' : '#ef4444';

  return (
    <Card className=" bg-slate-800 text-white">
      <CardHeader>
        <CardTitle>Chart</CardTitle>
        <CardDescription>YTD chart</CardDescription>
      </CardHeader>
      <CardContent>
        <div className=" p-5">
          <LineChart data={data as DataPoint[]} themeColor={themeColor} />
        </div>
      </CardContent>
    </Card>
  );
};
export default ChartCard;
