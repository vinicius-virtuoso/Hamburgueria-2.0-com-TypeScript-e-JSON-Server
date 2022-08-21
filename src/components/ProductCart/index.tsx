import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import trashIcon from "../../assets/trash-icon.svg";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { api } from "../../services/api";

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

export const ProductCart = ({ product }: ProductType) => {
  const { accessToken } = useAuth();
  const { renderCart, removeOnCart } = useCart();
  const [quant, setQuant] = useState(product.quantity);

  function modifyQuantity(action: string) {
    if (action === "sub" && quant > 1) {
      setQuant(quant - 1);
    }
    if (action === "add") {
      setQuant(quant + 1);
    }
  }

  useEffect(() => {
    if (accessToken && product.quantity) {
      api
        .patch(
          `/carts/${product.id}`,
          { quantity: quant },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((_) => {
          renderCart();
        });
    }
  }, [quant]);

  return (
    <Flex as="li" justifyContent="flex-start" gap={3} w="100%">
      <Box w="7rem" bgColor="gray.300" rounded={4}>
        <Image
          src={product.image}
          alt={product.title}
          maxW="100%"
          objectFit="contain"
          h="100%"
        />
      </Box>
      <Box w="100%">
        <Flex alignItems="center" justifyContent="space-between" w="100%">
          <Heading fontSize="xl">{product.title}</Heading>
          <Button bg="transparent" onClick={() => removeOnCart(product.id)}>
            <Image src={trashIcon} alt="remove item" />
          </Button>
        </Flex>
        <Flex
          alignItems="center"
          border="1px"
          borderColor="gray.300"
          w="40%"
          justify="space-between"
        >
          <Button
            bg="gray.300"
            fontSize="2xl"
            rounded={0}
            size="sm"
            onClick={() => modifyQuantity("sub")}
          >
            -
          </Button>
          <Text>{quant}</Text>
          <Button
            bg="gray.300"
            fontSize="sm"
            rounded={0}
            size="sm"
            onClick={() => modifyQuantity("add")}
          >
            +
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
