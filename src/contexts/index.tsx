import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";
import { AuthProvider } from "./AuthContext";
import { ProductsProvider } from "./ProductsContext";
import { CartProvider } from "./CartContext";

interface ChildrenProp {
  children: ReactNode;
}

export const AppProvider = ({ children }: ChildrenProp) => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <CartProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  );
};
