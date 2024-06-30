export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
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
