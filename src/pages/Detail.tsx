import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';

const DetailPage = () => (
  <div>
    <Card>
      <CardHeader>
        <CardTitle className=" text-5xl font-bold">AAPL</CardTitle>
        <CardDescription>Apple Inc.</CardDescription>
      </CardHeader>
      <CardContent className=" flex flex-col gap-4">
        <h3 className=" text-3xl font-bold">Quote</h3>
        <div className=" grid grid-rows-3 grid-flow-col gap-4">
          <div>last</div>
          <div>high</div>
          <div>low</div>
          <div>change</div>
          <div>change%</div>
          <div>vol</div>
          <div>Open</div>
          <div>Close</div>
          <div>low</div>
          <div>Dividend</div>
          <div>EPS</div>
          <div>P/E</div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default DetailPage;
