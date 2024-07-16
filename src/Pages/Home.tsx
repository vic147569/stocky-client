import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import Stock1 from '@/Assets/Stock1.jpg';
import SearchBar, { SearchForm } from '@/Components/SearchBar';
import { useCreateUser } from '@/Api/UserApi';
import { useCreateWatchlist } from '@/Api/WatchlistApi';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { createUser } = useCreateUser();
  const { createWatchlist } = useCreateWatchlist();
  const hasCreatedUser = useRef(false);
  const hasCreatedWatchlist = useRef(false);

  const handleSearchSubmit = (searchFormValue: SearchForm) => {
    navigate({ pathname: `/stock/${searchFormValue.searchQuery}` });
  };

  useEffect(() => {
    if (user?.id && user.primaryEmailAddress && user.fullName && !hasCreatedUser.current) {
      createUser({ userId: user.id, name: user.fullName, email: user.primaryEmailAddress.emailAddress });
      hasCreatedUser.current = true;
      createWatchlist({ userId: user.id, stockList: [] });
      hasCreatedWatchlist.current = true;
    }
  }, [createUser, createWatchlist, navigate, user]);

  return (
    <div className=" mx-auto flex flex-col mt-0">
      <img src={Stock1} alt="stocky" className=" w-full max-h-[300px] object-cover" />
      <h1 className=" text-6xl text-yellow-500 text-center">Stocky, your investment partner!</h1>
      <span className=" text-center text-3xl">Get latest stock market information at Stocky</span>
      <SearchBar onSubmit={handleSearchSubmit} />
    </div>
  );
};
export default HomePage;
