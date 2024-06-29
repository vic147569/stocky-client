import { useParams } from 'react-router-dom';
import { useGetStockQuote } from '@/Api/StockApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import format, { mod } from '@/utils';
import LineChart from '@/Components/Chart';

const DetailPage = () => {
  const { symbol } = useParams();
  const { stockQuote, isLoading } = useGetStockQuote(symbol);
  const data = [
    { date: new Date(2020, 4, 1), value: 30 },
    { date: new Date(2020, 4, 2), value: 20 },
    { date: new Date(2020, 4, 3), value: 25 },
    { date: new Date(2020, 4, 4), value: 35 },
    { date: new Date(2020, 4, 5), value: 45 },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col gap-5">
      <Card className=" bg-slate-800 text-white">
        <CardHeader>
          <CardTitle className=" text-5xl font-bold">{stockQuote?.symbol}</CardTitle>
          <CardDescription>{stockQuote?.name}</CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-4">
          <h3 className=" text-3xl font-bold">Quote</h3>
          <div className=" grid grid-rows-3 grid-flow-col gap-4">
            <div className=" flex justify-between">
              Last: <div>{format(stockQuote?.last)}</div>
            </div>
            <div className=" flex justify-between">
              High: <div>{format(stockQuote?.dayHigh)}</div>
            </div>
            <div className=" flex justify-between">
              Low: <div>{format(stockQuote?.dayLow)}</div>
            </div>
            <div className=" flex justify-between">
              Change:{' '}
              <div className={`${(stockQuote?.changePercent as number) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {format(stockQuote?.change)}
              </div>
            </div>
            <div className={`flex justify-between `}>
              Change%:{' '}
              <div className={`${(stockQuote?.changePercent as number) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {format(stockQuote?.changePercent)}%
              </div>
            </div>
            <div className=" flex justify-between">
              volume: <div>{mod(stockQuote?.vol)}</div>
            </div>
            <div className=" flex justify-between">
              Open: <div>{format(stockQuote?.open)}</div>
            </div>
            <div className=" flex justify-between">
              PrevClose: <div>{format(stockQuote?.close)}</div>
            </div>
            <div className=" flex justify-between">
              Dividend Yield:
              <div>{format(stockQuote?.dividend)}</div>
            </div>
            <div className=" flex justify-between">
              EPS:
              <div>{format(stockQuote?.EPS)}</div>
            </div>
            <div className=" flex justify-between">
              P/E:
              <div>{format(stockQuote?.PE)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className=" bg-slate-800 text-white">
        <CardHeader>
          <CardTitle>Chart</CardTitle>
          <CardDescription>Five day chart</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" p-5">
            <LineChart data={data} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPage;
