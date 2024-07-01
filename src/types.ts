export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

export type Watchlist = {
  userId: string;
  stockList: string[];
};

export type StockQuote = {
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
export type Price = {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  adjClose: number;
  volume: number;
};
export type StockHistory = { symbol: string; price: Price[] };
export type StockRecommendation = { result: string };

export type IsInWatchlist = {
  isInWatchlist: boolean;
};

export type CreateUserRequest = {
  userId: string;
  name: string;
  email: string;
};

export type UpdateUserRequest = {
  name: string;
  email: string;
  phone: string;
};

export type CreateWatchlistRequest = {
  userId: string;
  stockList: string[];
};
