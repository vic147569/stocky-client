import { useQuery } from 'react-query';
import { StockHistory, StockQuote, StockRecommendation } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getStockQuoteRequest = async (symbol?: string): Promise<StockQuote> => {
  const response = await fetch(`${API_BASE_URL}/api/stocks/quote/${symbol}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
export const useGetStockQuote = (symbol?: string) =>
  useQuery(['stockQuote', symbol], () => getStockQuoteRequest(symbol));

export const useGetStockHistory = (symbol?: string) => {
  const getStockHistoryRequest = async (): Promise<StockHistory> => {
    const response = await fetch(`${API_BASE_URL}/api/stocks/history/${symbol}`);
    if (!response.ok) throw new Error('Cannot get stock history');
    return response.json();
  };

  const { data: stockHistory, isLoading } = useQuery('fetchStockHistory', getStockHistoryRequest, {
    enabled: !!symbol,
  });
  return { stockHistory, isLoading };
};

const getStockRecommendation = async (symbol?: string): Promise<StockRecommendation> => {
  const response = await fetch(`${API_BASE_URL}/api/stocks/recommendation/${symbol}`);
  if (!response.ok) throw new Error('Cannot get stock recommendation');
  return response.json();
};
export const useGetStockRecommendation = (symbol?: string) =>
  useQuery(['fetchStockRecommendation', symbol], () => getStockRecommendation(symbol));
