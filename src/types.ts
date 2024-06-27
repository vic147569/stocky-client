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
