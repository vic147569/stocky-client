import { Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Toggle } from './ui/toggle';
import format, { mod } from '@/utils';
import { useGetStockQuote, useGetStockRecommendation } from '@/Api/StockApi';
import { useGetIsInWatchlist, useUpdateWatchlist } from '@/Api/WatchlistApi';

const QuoteCard = () => {
  const { symbol } = useParams();
  const { data: stockQuote, isLoading: isGetStockQuoteLoading } = useGetStockQuote(symbol);
  const { data: stockRecommendation, isLoading: isGetStockRecommendationLoading } = useGetStockRecommendation(symbol);
  const { data: isInWatchlist, isLoading: isGetIsInWatchlistLoading } = useGetIsInWatchlist(symbol);
  const { updateWatchlist } = useUpdateWatchlist(symbol);
  const res = isInWatchlist?.isInWatchlist;
  const [status, setStatus] = useState(res);

  useEffect(() => {
    setStatus(res);
  }, [res]);

  if (isGetStockQuoteLoading || isGetIsInWatchlistLoading || isGetStockRecommendationLoading) {
    return <div>Loading...</div>;
  }

  const handleToggle = async () => {
    const updatedStatus = await updateWatchlist();
    setStatus(updatedStatus.stockList.includes(symbol?.toUpperCase() as string));
  };

  let themeColor1 = '';
  if (stockRecommendation?.result.includes('Buy')) themeColor1 = 'text-green-500';
  if (stockRecommendation?.result.includes('Sell')) themeColor1 = 'text-red-500';
  const themeColor2 = stockQuote!.change > 0 ? 'text-green-500' : 'text-red-500';

  return (
    <Card className=" bg-slate-800 text-white">
      <CardHeader className=" flex flex-col justify-between ">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className=" text-5xl font-bold">{stockQuote?.symbol}</CardTitle>
            <CardDescription>{stockQuote?.name}</CardDescription>
          </div>
          <Toggle pressed={status} onPressedChange={handleToggle}>
            <Star />
          </Toggle>
        </div>
        <div className=" text-2xl flex gap-3">
          Recommendation:
          <div className={themeColor1}>{stockRecommendation?.result}</div>
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
            Change: <div className={themeColor2}>{format(stockQuote?.change)}</div>
          </div>
          <div className={`flex justify-between `}>
            Change%: <div className={themeColor2}>{format(stockQuote?.changePercent)}%</div>
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
            <div>{String(format(stockQuote?.dividend))}</div>
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
