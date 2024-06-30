import { useParams } from 'react-router-dom';
import { useGetStockHistory, useGetStockQuote } from '@/Api/StockApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import format, { mod } from '@/utils';
import LineChart, { DataPoint } from '@/Components/Chart';

const DetailPage = () => {
  const { symbol } = useParams();
  const { stockQuote, isLoading: quoteLoading } = useGetStockQuote(symbol);
  const { stockHistory, isLoading: historyLoading } = useGetStockHistory(symbol);

  const data = stockHistory?.price.map((item) => ({
    date: new Date(item.date),
    value: item.close,
  }));

  if (quoteLoading || historyLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col gap-5">
      {/* quote */}
      <Card className=" bg-slate-800 text-white">
        <CardHeader>
          <CardTitle className=" text-5xl font-bold">{stockQuote?.symbol}</CardTitle>
          <CardDescription>{stockQuote?.name}</CardDescription>
        </CardHeader>
        <CardContent className=" flex flex-col gap-4">
          <h3 className=" text-3xl font-bold">Quote</h3>
          <div className=" grid grid-rows-6 md:grid-rows-3 grid-flow-col gap-4">
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
      {/* chart */}
      <Card className=" bg-slate-800 text-white">
        <CardHeader>
          <CardTitle>Chart</CardTitle>
          <CardDescription>Five day chart</CardDescription>
        </CardHeader>
        <CardContent>
          <div className=" p-5">
            <LineChart data={data as DataPoint[]} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPage;
