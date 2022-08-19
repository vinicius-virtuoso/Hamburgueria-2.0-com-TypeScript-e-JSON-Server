import { useToast } from "@chakra-ui/react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../AuthContext";

interface ContextProps {
  products: ProductsType[];
  productsLoading: boolean;
  getProducts: () => void;
}

interface ProductsType {
  image: string;
  title: string;
  category: string;
  price: number;
  id: number;
  quantity: number;
}

interface ChildrenProp {
  children: ReactNode;
}

const ProductsContext = createContext<ContextProps>({} as ContextProps);

const ProductsProvider = ({ children }: ChildrenProp) => {
  const { accessToken, logout } = useAuth();
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function getProducts() {
    if (accessToken) {
      setProductsLoading(true);
      api
        .get("/products", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(({ data }) => {
          setProducts(data);
          setProductsLoading(false);
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            console.log(response);
            logout();
            toast({
              position: "top",
              title: "Sua sessão expirou",
              description: "Por favor, faça o login novamente",
              status: "warning",
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              position: "top",
              title: "Ocorreu um error",
              description:
                "Erro desconhecido por favor tente novamente mais tarde",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          }
        });
    }
  }

  return (
    <ProductsContext.Provider
      value={{ products, productsLoading, getProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { ProductsProvider, useProducts };
