import { useNavigate } from 'react-router-dom';
import { useGetStockQuote, useGetStockRecommendation } from '@/Api/StockApi';
import { TableCell, TableRow } from './ui/table';
import format from '@/utils';

type Props = { symbol: string };
const MyTableRow: React.FC<Props> = ({ symbol }) => {
  const { data: stockQuote, isLoading: quoteLoading } = useGetStockQuote(symbol);
  const { data: stockRecommendation, isLoading: recommendationLoading } = useGetStockRecommendation(symbol);
  const navigate = useNavigate();

  if (quoteLoading || recommendationLoading) {
    return <div>Loading</div>;
  }

  const themeColor1 = stockQuote!.change > 0 ? 'text-green-500' : 'text-red-500';
  let themeColor2 = '';
  if (stockRecommendation?.result.includes('Buy')) themeColor2 = 'text-green-500';
  if (stockRecommendation?.result.includes('Sell')) themeColor2 = 'text-red-500';

  return (
    <TableRow onClick={() => navigate(`/stock/${symbol}`)}>
      <TableCell>{stockQuote?.symbol}</TableCell>
      <TableCell>{stockQuote?.name}</TableCell>
      <TableCell>{String(format(stockQuote?.last))}</TableCell>
      <TableCell className={themeColor1}>{String(format(stockQuote?.change))}</TableCell>
      <TableCell>{String(format(stockQuote?.changePercent))}</TableCell>
      <TableCell className={themeColor2}>{stockRecommendation?.result}</TableCell>
    </TableRow>
  );
};

export default MyTableRow;
