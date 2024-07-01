import { useParams } from 'react-router-dom';
import QuoteCard from '@/Components/QuoteCard';
import ChartCard from '@/Components/ChartCard';

const DetailPage = () => {
  const { symbol } = useParams();
  return (
    <div className=" flex flex-col gap-5">
      <QuoteCard />
      <ChartCard symbol={symbol} />
    </div>
  );
};

export default DetailPage;
