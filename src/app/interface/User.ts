export interface User {
  id?: string;
  username: string;
  email: string;
  role: Role,
  image?: string,
  password?: string;
}
