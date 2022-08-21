import {
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";

import { ProductCart } from "../ProductCart";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart, removeAllCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = cart.reduce((acc, att) => {
        return acc + att.price * att.quantity;
      }, 0);
      setTotalPrice(total);
    }
  }, [cart]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent overflow="hidden" m={2} alignSelf="center">
          <ModalHeader bgColor="green.400" color="white">
            Carrinho de compras
            <ModalCloseButton size={["md", "md", "md", "lg"]} />
          </ModalHeader>
          <ModalBody>
            {cart?.length > 0 ? (
              <>
                <VStack as="ul" maxH="300px" overflow="auto" spacing={4}>
                  {cart.map((product) => (
                    <ProductCart key={product.id} product={product} />
                  ))}
                </VStack>

                <VStack py={4}>
                  <Divider
                    borderColor="gray.400"
                    borderBottomWidth="2px"
                    rounded={4}
                  />

                  <Flex justifyContent="space-between" w="100%" py={4}>
                    <Text fontWeight="bold">Total:</Text>
                    <Text fontWeight="bold" color="gray.500">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(totalPrice)}
                    </Text>
                  </Flex>
                  <Button
                    size="lg"
                    fontSize="1rem"
                    w="100%"
                    color="gray.600"
                    fontWeight="400"
                    onClick={removeAllCart}
                  >
                    Remover todos
                  </Button>
                </VStack>
              </>
            ) : (
              <VStack textAlign="center" p="50px 10px" spacing={4}>
                <Heading as="h5" size="md">
                  Sua sacola está vazia
                </Heading>
                <Text as="span" color="gray.500" fontWeight="400">
                  Adicione itens
                </Text>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
