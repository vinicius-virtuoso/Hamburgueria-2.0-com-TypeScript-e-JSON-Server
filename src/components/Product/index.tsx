import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useCart } from "../../contexts/CartContext";

interface ProductType {
  product: {
    image: string;
    title: string;
    category: string;
    price: number;
    id: number;
    quantity: number;
  };
}

export const Product = ({ product }: ProductType) => {
  const { addOnCart, cart, quantProduct } = useCart();
  const [hoverColorUp, setHoverColorUp] = useState("gray.500");

  let findProduct = cart
    ?.filter((c) => c.id === product.id)
    .find((productFind) => productFind.id === product.id);

  const hoverMouse = useCallback(() => {
    setHoverColorUp("green.400");
  }, []);

  const leaveMouse = useCallback(() => {
    setHoverColorUp("gray.500");
  }, []);

  return (
    <Box
      border="2px"
      borderColor="gray.300"
      maxW="100%"
      w="100%"
      minW="270px"
      display="flex"
      flexDir="column"
      rounded={6}
      _hover={{ borderColor: "green.400" }}
      shadow="base"
      onMouseEnter={hoverMouse}
      onMouseLeave={leaveMouse}
      h="100%"
    >
      <Flex
        bgColor="gray.200"
        h="150px"
        alignContent="center"
        justifyContent="center"
      >
        <Image
          src={product.image}
          alt={product.title}
          maxW="100%"
          bgPosition="center"
          objectPosition="center"
          objectFit="contain"
        />
      </Flex>
      <Flex flexDir="column" p={[4, 4, 6, 8]} gap={4}>
        <Heading
          as="h3"
          size={["sm", "sm", "md", "md"]}
          noOfLines={1}
          title={product.title}
        >
          {product.title}
        </Heading>
        <Text as="span" fontSize=".875rem" color="gray.500">
          {product.category}
        </Text>
        <Text as="strong" fontSize="1.3rem" color="green.500">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </Text>
        <Button
          size="lg"
          maxW="55%"
          bgColor={hoverColorUp}
          color="white"
          onClick={() =>
            findProduct
              ? quantProduct(product, findProduct.quantity + 1)
              : addOnCart({ ...product, quantity: 1 })
          }
        >
          Adicionar
        </Button>
      </Flex>
    </Box>
  );
};
