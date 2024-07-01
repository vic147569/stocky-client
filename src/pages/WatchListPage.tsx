import { useGetWatchlist } from '@/Api/WatchlistApi';
import MyTableRow from '@/Components/MyTableRow';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/Components/ui/table';

const WatchlistPage = () => {
  const { watchlist } = useGetWatchlist();

  return (
    <Card className=" bg-slate-800 text-white">
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Your watchlist</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Last</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Change%</TableHead>
              <TableHead>Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{watchlist?.stockList.map((s) => <MyTableRow symbol={s} key={s} />)}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default WatchlistPage;
