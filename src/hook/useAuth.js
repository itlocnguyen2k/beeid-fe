import { createContext, useContext } from "react";

export const AuthContext = createContext({
  auth: {
    account: {},
    isAuthenticated: true,
  },
  setAuth: (auth) => {
    return;
  },
});

export const useAuth = () => useContext(AuthContext);
