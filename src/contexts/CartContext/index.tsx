import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../../services/api";
import { useAuth } from "../AuthContext";

interface ContextProps {
  cart: CartType[];
  renderCart: () => void;
  addOnCart: (product: CartType) => void;
  quantProduct: (product: CartType, quantityProduct: number) => void;
  removeOnCart: (productId: number) => void;
  removeAllCart: () => void;
}

interface CartType {
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

const CartContext = createContext<ContextProps>({} as ContextProps);

const CartProvider = ({ children }: ChildrenProp) => {
  const { accessToken, userId } = useAuth();
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    if (userId) {
      renderCart();
    }
  }, [userId]);

  function renderCart() {
    api
      .get(`users/${userId}?_embed=carts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => {
        setCart(data.carts);
      });
  }

  const addOnCart = (product: CartType) => {
    if (accessToken && userId) {
      api
        .post(
          `/carts`,
          { ...product, userId: userId, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          setCart(data.carts);
          renderCart();
        })
        .catch((_) => {});
    }
  };

  const quantProduct = (product: CartType, quantityProduct: number) => {
    if (accessToken) {
      api
        .patch(
          `/carts/${product.id}`,
          {
            ...product,
            quantity: quantityProduct,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then(({ data }) => {
          setCart(data.carts);
          renderCart();
        });
    }
  };

  const removeOnCart = (productId: number) => {
    if (accessToken) {
      api
        .delete(`/carts/${productId}`, {
          headers: { Authorization: "Bearer " + accessToken },
        })
        .then((_) => {
          renderCart();
        });
    }
  };

  const removeAllCart = () => {
    if (accessToken) {
      cart.forEach((product) => {
        api
          .delete(`/carts/${product.id}`, {
            headers: { Authorization: "Bearer " + accessToken },
          })
          .then((_) => {
            console.log("product removed" + product.title + " from cart");
          });
      });
      renderCart();
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        renderCart,
        addOnCart,
        quantProduct,
        removeOnCart,
        removeAllCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { CartProvider, useCart };
