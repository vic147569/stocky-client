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
type Price = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
};
type StockHistory = { symbol: string; price: Price[] };
type StockRecommendation = { result: string };

export const useGetStockQuote = (symbol?: string) => {
  const getStockQuoteRequest = async (): Promise<StockQuote> => {
    const response = await fetch(`${API_BASE_URL}/api/stocks/quote/${symbol}`);

    if (!response.ok) {
      throw new Error('Cannot get stock quote');
    }

    return response.json();
  };

  const { data: stockQuote, isLoading } = useQuery('fetchStockQuote', getStockQuoteRequest, { enabled: !!symbol });
  return { stockQuote, isLoading };
};

export const useGetStockHistory = (symbol?: string) => {
  const getStockHistoryRequest = async (): Promise<StockHistory> => {
    const response = await fetch(`${API_BASE_URL}/api/stocks/history/${symbol}`);

    if (!response.ok) {
      throw new Error('Cannot get stock history');
    }

    return response.json();
  };

  const { data: stockHistory, isLoading } = useQuery('fetchStockHistory', getStockHistoryRequest, {
    enabled: !!symbol,
  });
  return { stockHistory, isLoading };
};

export const useGetStockRecommendation = (symbol?: string) => {
  const getStockRecommendation = async (): Promise<StockRecommendation> => {
    const response = await fetch(`${API_BASE_URL}/api/stocks/recommendation/${symbol}`);
    if (!response.ok) throw new Error('Cannot get stock recommendation');
    return response.json();
  };
  const { data: stockRecommendation, isLoading } = useQuery('fetchStockRecommendation', getStockRecommendation, {
    enabled: !!symbol,
  });
  return { stockRecommendation, isLoading };
};
