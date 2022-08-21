import {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

interface ContextProps {
  accessToken: string;
  singIn: (credentials: SingInCredentials) => Promise<void>;
  logout: () => void;
  userId: number;
}

interface ChildrenProp {
  children: ReactNode;
}

interface AuthState {
  accessToken: string;
  user: {
    id: number;
    email: string;
  };
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
  const [userId, setUserId] = useState<number>(0);
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@hamburgueria:accessToken");
    const user = localStorage.getItem("@hamburgueria:user");

    if (accessToken && user) {
      return { accessToken, user: { ...JSON.parse(user) } };
    }
    return {} as AuthState;
  });

  useEffect(() => {
    if (data.accessToken) {
      setUserId(data.user.id);
    }
  }, [data]);

  const navigate = useNavigate();

  const singIn = useCallback(async ({ email, password }: SingInCredentials) => {
    const response = await api.post("/login", { email, password });
    const { accessToken, user } = response.data;
    localStorage.setItem("@hamburgueria:accessToken", accessToken);
    localStorage.setItem("@hamburgueria:user", JSON.stringify(user));
    setData({ accessToken, user });
  }, []);

  const logout = useCallback(async () => {
    localStorage.clear();
    setData({} as AuthState);
    navigate("/login");
  }, []);

  return (
    <AuthContext.Provider
      value={{ singIn, logout, accessToken: data.accessToken, userId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
