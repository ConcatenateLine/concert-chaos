import { createContext, useState } from "react";
import AuthContextInterface, {
  AuthStateInterface,
} from "../interfaces/AuthContext.interface";

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<AuthStateInterface>({
    isAuthenticated: false,
    user: null,
  });

  const login = (username: string) => {
    setAuthState({ isAuthenticated: true, user: username });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
