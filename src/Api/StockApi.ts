import { useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type StockQuote = {
  _id: string;
  symbol: string;
  name: string;
  sector: string;
  last: number;
  open: number;
  close: number;
  vol: number;
  change: number;
  changePercent: number;
  dayHigh: number;
  dayLow: number;
  yearHigh: number;
  yearLow: number;
  dividend: number;
  EPS: number;
  PE: number;
};

export const useGetStockQuote = (symbol?: string) => {
  const getStockQuoteRequest = async (): Promise<StockQuote> => {
    const response = await fetch(`${API_BASE_URL}/api/stocks/${symbol}`);

    if (!response.ok) {
      throw new Error('Cannot get stock');
    }

    return response.json();
  };

  const { data: stockQuote, isLoading } = useQuery('fetchStock', getStockQuoteRequest, { enabled: !!symbol });
  return { stockQuote, isLoading };
};

export const a = 5;
