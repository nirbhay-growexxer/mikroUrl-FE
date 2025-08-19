export interface User {
  _id: string;
  email: string;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  // Add other user properties as needed
}

export interface UserResponse {
  status: number;
  message: string;
  data: {
    user: User;
  };
}
