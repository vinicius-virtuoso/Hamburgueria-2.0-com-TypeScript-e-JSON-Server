import { Box, Container, Grid } from "@chakra-ui/react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Product } from "../components/Product";
import { SkeletonComponent } from "../components/SkeletonComponent";
import { useCart } from "../contexts/CartContext";

import { useProducts } from "../contexts/ProductsContext";

export const Catalog = () => {
  const { products, productsLoading, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Box minH="100vh">
      <Header />
      <Container maxW="container.xl">
        <Grid
          overflowX={["scroll", "hidden", "hidden", "hidden"]}
          py={4}
          gap={[6, 6, 6, 6, 12]}
          gridTemplateColumns={[
            "repeat(8,1fr)",
            "repeat(2,1fr)",
            "repeat(2,1fr)",
            "repeat(3,1fr)",
            "repeat(4,1fr)",
          ]}
          gridTemplateRows={["1fr", "1fr", "1fr", "1fr", "repeat(2,1fr)"]}
          justifyItems="center"
        >
          {!productsLoading
            ? products.map((product) => (
                <Product key={product.id} product={product} />
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SkeletonComponent key={num} />
              ))}
        </Grid>
      </Container>
    </Box>
  );
};
