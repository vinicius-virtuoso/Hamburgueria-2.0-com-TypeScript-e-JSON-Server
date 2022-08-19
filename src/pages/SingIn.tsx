import { useState } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.svg";
import pointsImg from "../assets/group-points.svg";
import { Input } from "../components/Form/Input";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { container, item } from "../styles/animate";
import { useAuth } from "../contexts/AuthContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido.")
    .required("Email obrigatório"),
  password: yup.string().required("Digite sua senha."),
});

interface LoginType {
  email: string;
  password: string;
}

export const SingIn = () => {
  const [loading, setLoading] = useState(false);
  const { singIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
  });

  const submitFormLogin = ({ email, password }: LoginType) => {
    setLoading(true);
    singIn({ email, password })
      .then((_) => setLoading(false))
      .catch((err) => {
        setLoading(false);
        toast({
          position: "top",
          title: "Ocorreu um error",
          description: "Verifique se as credencias então corretas",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box>
      <Container
        minH="100vh"
        display="flex"
        maxW="container.lg"
        padding={[4, 6, 7, 0]}
        alignItems={["center", "center", "center", "center"]}
        gap={[6, 6, 6, 24]}
        flexDir={["column-reverse", "column-reverse", "column-reverse", "row"]}
        justifyContent={["flex-end", "flex-end", "flex-end", "space-between"]}
      >
        <Box w={["auto", "auto", "auto", "50%"]}>
          <Box
            as={motion.form}
            onSubmit={handleSubmit(submitFormLogin)}
            boxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.15)"
            p={[4, 4, 6, 8]}
            rounded={4}
            maxWidth="470px"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mb={[0, 0, 0, 8]}
            >
              <Heading
                size={["md", "md", "md", "lg"]}
                color="gray.700"
                as={motion.h2}
                variants={item}
              >
                Login
              </Heading>
            </Flex>
            <VStack mt={6} spacing={5}>
              <Input
                type="email"
                placeholder="Email*"
                {...register("email")}
                error={errors.email}
                variants={item}
              />

              <Input
                type="password"
                placeholder="Senha*"
                {...register("password")}
                error={errors.password}
                variants={item}
              />
            </VStack>
            <VStack spacing={4}>
              <Button
                as={motion.button}
                type="submit"
                size="lg"
                w="100%"
                mt={4}
                bg="green.500"
                color="white"
                _hover={{ bgColor: "green.600" }}
                disabled={!isDirty}
                isLoading={loading}
                _disabled={{ opacity: 0.3, pointerEvents: "none" }}
                variants={item}
              >
                Logar
              </Button>
              <Text
                textAlign="center"
                maxWidth="80%"
                fontSize="sm"
                color="gray.500"
                as={motion.p}
                variants={item}
              >
                Crie sua conta para saborear muitas delícias e matar sua fome!
              </Text>
              <Button
                as={motion.button}
                variants={item}
                size="lg"
                w="100%"
                bg="gray.200"
                _hover={{ bgColor: "gray.300" }}
                color="gray.500"
                onClick={() => navigate("/cadastro")}
              >
                Cadastrar
              </Button>
            </VStack>
          </Box>
        </Box>
        <Flex
          mt={["2rem", "2rem", "2rem", "1rem"]}
          flexDir="column"
          gap={6}
          w={["auto", "auto", "auto", "50%"]}
          as={motion.div}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <Image
            src={logoImg}
            maxW={["220px", "220px", "220px", "240px"]}
            as={motion.img}
            variants={item}
          />
          <Flex
            p={4}
            gap={[2, 2, 4, 6]}
            rounded={4}
            border="1px"
            borderColor="gray.300"
            maxWidth={["350px", "350px", "400px", "450px"]}
            shadow="md"
          >
            <Box
              width={["30%", "30%", "30%", "30%"]}
              p={6}
              bg="green.50"
              color="green.500"
              rounded={4}
              as={motion.div}
              variants={item}
            >
              <RiShoppingBag3Line size="100%" />
            </Box>
            <Text
              fontSize={[".875rem", ".875rem", ".875rem", "lg"]}
              as={motion.p}
              variants={item}
            >
              A vida é como um sanduíche, é preciso recheá-la com os{" "}
              <strong>melhores</strong> ingredientes.
            </Text>
          </Flex>
          <Image
            src={pointsImg}
            alt="points"
            display={["none", "none", "none", "block"]}
            maxWidth="250px"
          />
        </Flex>
      </Container>
    </Box>
  );
};
