import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";
// import { api } from "../services/api";

interface ContextProps {
  user: User;
  accessToken: string;
  singIn: (credentials: SingInCredentials) => Promise<void>;
}

interface ChildrenProp {
  children: ReactNode;
}

interface User {
  email: string;
  id: string;
  name: string;
}

interface AuthState {
  accessToken: string;
  user: User;
}

interface SingInCredentials {
  email: string;
  password: string;
}

const AuthContext = createContext<ContextProps>({} as ContextProps);

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: ChildrenProp) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@hamburgueria:accessToken");
    const user = localStorage.getItem("@hamburgueria:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const singIn = useCallback(async ({ email, password }: SingInCredentials) => {
    // const response = await api.post("/login", { email, password });
    // const { accessToken, user } = response.data;
    // localStorage.setItem("@Doit:accessToken", accessToken);
    // localStorage.setItem("@Doit:user", JSON.stringify(user));
    // setData({ accessToken, user });
  }, []);

  return (
    <AuthContext.Provider
      value={{ singIn, accessToken: data.accessToken, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
