export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }
  
  export interface RegisterResponse {
    message: string;
    userId: number;
  }