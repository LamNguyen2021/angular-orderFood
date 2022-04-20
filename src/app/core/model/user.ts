export interface ListUser {
  success: boolean;
  message: string;
  data: User[];
}

export interface User {
  id: string;
  roles: string;
  name: string;
  address: string;
  location: null | string;
  phone: string;
  email: string;
  username: string;
}
