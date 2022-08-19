import {
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
import { useState } from "react";
import { useCart } from "../../contexts/CartContext";

interface CartProps {
  isOpen: boolean;

  onClose: () => void;
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

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
            <VStack textAlign="center" p="50px 10px" spacing={4}>
              <Heading as="h5" size="md">
                Sua sacola está vazia
              </Heading>
              <Text as="span" color="gray.500" fontWeight="400">
                Adicione itens
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
