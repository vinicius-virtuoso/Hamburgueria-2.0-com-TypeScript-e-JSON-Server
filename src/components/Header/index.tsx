import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import logoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";
import { InputSearch } from "../InputSearch";

import searchIcon from "../../assets/search-icon.svg";
import cartIcon from "../../assets/cart-icon.svg";
import logoutIcon from "../../assets/logout-icon.svg";
import { Cart } from "../Cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { container, item } from "../../styles/animate";
import { useCart } from "../../contexts/CartContext";

export const Header = () => {
  const [isSearch, setIsSearch] = useState(false);
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cart) {
      setCartCount(cart?.reduce((acc, att) => acc + att.quantity, 0));
    }
  }, [cart]);

  return (
    <Box bg="gray.100" as="header" minH="80px">
      <Container maxW="container.xl" py={[4]}>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          as={motion.div}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {!isSearch ? (
            <>
              <Box
                w={["140px", "150px", "160px", "240px"]}
                as={motion.div}
                variants={item}
              >
                <Image src={logoImg} maxW="100%" />
              </Box>

              <Flex gap={[3, 3, 4, 6]}>
                <Button
                  fontSize={["1.5rem", "1.5rem", "1.5rem", "2.5rem"]}
                  color="gray.500"
                  fontWeight="bold"
                  display={["flex", "flex", "flex", "none"]}
                  alignItems="center"
                  justifyContent="center"
                  p={0}
                  onClick={() => setIsSearch(!isSearch)}
                  as={motion.button}
                  variants={item}
                >
                  <Image src={searchIcon} alt="search" />
                </Button>
                <InputSearch
                  display={["none", "none", "none", "block"]}
                  placeholder="Digitar Pesquisa"
                />
                <Button
                  fontSize={["1.5rem"]}
                  color="gray.500"
                  fontWeight="bold"
                  p={0}
                  position="relative"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={onOpen}
                  as={motion.button}
                  variants={item}
                >
                  <Text
                    position="absolute"
                    top="-5px"
                    right="0px"
                    fontSize={[".775rem", ".775rem", ".775rem", ".875rem"]}
                    bgColor="green.500"
                    color="white"
                    p="2px 4px"
                    rounded={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {cartCount > 99 ? 99 + "+" : cartCount}
                  </Text>
                  <Image src={cartIcon} alt="cart" />
                </Button>
                <Button
                  fontSize={["1.5rem"]}
                  color="gray.500"
                  fontWeight="bold"
                  p={0}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  onClick={logout}
                  as={motion.button}
                  variants={item}
                >
                  <Image src={logoutIcon} alt="logout" />
                </Button>
              </Flex>
            </>
          ) : (
            <InputSearch
              setIsSearch={setIsSearch}
              display={["block", "block", "block", "none"]}
            />
          )}
        </Flex>
      </Container>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};
