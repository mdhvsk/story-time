export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
    token: string;
  }
  
  export interface UserContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
  }

  export {}