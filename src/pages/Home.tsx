import Stock1 from '@/Assets/Stock1.jpg';
import SearchForm from '@/Components/SearchForm';

const HomePage = () => (
  <div className=" mx-auto flex flex-col mt-0">
    <img src={Stock1} alt="stocky" className=" w-full max-h-[300px] object-cover" />
    <h1 className=" text-6xl text-yellow-500 text-center">Stocky, your investment partner!</h1>
    <span className=" text-center text-3xl">Get latest stock market information at Stocky</span>
    <SearchForm />
  </div>
);
export default HomePage;
