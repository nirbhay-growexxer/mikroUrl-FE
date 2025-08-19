import { User } from './user';

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
