import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Toggle } from './ui/toggle';
import format, { mod } from '@/utils';
import { useGetStockQuote } from '@/Api/StockApi';
import { useGetIsInWatchlist } from '@/Api/WatchlistApi';

const QuoteCard = () => {
  const { symbol } = useParams();
  const { stockQuote, isLoading: isGetStockQuoteLoading } = useGetStockQuote(symbol);
  const { isInWatchlist, isLoading: isGetIsInWatchlistLoading } = useGetIsInWatchlist(symbol);

  const res = isInWatchlist?.isInWatchlist;

  if (isGetStockQuoteLoading || isGetIsInWatchlistLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className=" bg-slate-800 text-white">
      <CardHeader className=" flex flex-row justify-between">
        <div>
          <CardTitle className=" text-5xl font-bold">{stockQuote?.symbol}</CardTitle>
          <CardDescription>{stockQuote?.name}</CardDescription>
        </div>
        <div>
          <Toggle pressed={res}>
            <Star />
          </Toggle>
        </div>
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
  );
};
export default QuoteCard;
