export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
  balance: number;
  dateJoined: string;
  birthdate: string;
  gender: string;
  inn?: string;
  location?: string;
  license?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export interface TableData {
  id: string;
  avatar: string;
  name: string;
  phone: string;
  role: string;
  date: string;
  time: string;
}