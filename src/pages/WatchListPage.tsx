import { useGetWatchlist } from '@/Api/WatchlistApi';

const WatchlistPage = () => {
  const { watchlist } = useGetWatchlist();

  return (
    <div>
      {watchlist?.userId} : {watchlist?.stockList} ???
    </div>
  );
};

export default WatchlistPage;
