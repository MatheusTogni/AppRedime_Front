export interface User {
  id: string;
  login: string;
  // Adicione outras propriedades do usuário conforme necessário
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}
