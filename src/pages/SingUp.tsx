import { useState } from "react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
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
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { container, item } from "../styles/animate";

const schema = yup.object().shape({
  name: yup.string().trim().required("Por favor digite seu nome"),
  email: yup
    .string()
    .email("Digite um email válido.")
    .required("Email obrigatório"),
  password: yup.string().required("Digite uma senha."),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senha então diferentes")
    .required("Confirme sua senha"),
});

interface LoginType {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const SingUp = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<LoginType>({
    resolver: yupResolver(schema),
  });

  const submitFormLogin = ({ name, email, password }: LoginType) => {
    setLoading(true);
    console.log({ name, email, password });
  };

  return (
    <Box>
      <Container
        minH="100vh"
        display="flex"
        maxW="container.lg"
        padding={[4, 6, 7, 0]}
        alignItems={["center", "flex-center", "flex-center", "center"]}
        gap={[6, 6, 6, 24]}
        flexDir={["column", "column", "column", "row"]}
        justifyContent={[
          "flex-start",
          "flex-start",
          "flex-start",
          "space-between",
        ]}
      >
        <Flex
          mt={["2rem", "2rem", "2rem", "1rem"]}
          flexDir="column"
          gap={6}
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
            maxWidth={["100%", "100%", "100%", "450px"]}
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
        <Box
          as={motion.form}
          onSubmit={handleSubmit(submitFormLogin)}
          boxShadow="0px 0px 1px 1px rgba(0, 0, 0, 0.15)"
          p={[4, 4, 6, 8]}
          rounded={4}
          maxWidth="470px"
          w="100%"
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
              Cadastro
            </Heading>
            <Box as={motion.div} variants={item}>
              <Text
                as={Link}
                to="/login"
                fontSize="sm"
                textDecoration="underline"
                color="gray.500"
                _hover={{ color: "gray.800" }}
              >
                Retornar para o login
              </Text>
            </Box>
          </Flex>
          <VStack mt={6} spacing={5}>
            <Input
              type="text"
              placeholder="Nome*"
              {...register("name")}
              error={errors.name}
              variants={item}
            />
            <Input
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
            <Input
              type="password"
              placeholder="Confirmar Senha*"
              {...register("passwordConfirmation")}
              error={errors.passwordConfirmation}
              variants={item}
            />
          </VStack>
          <Button
            as={motion.button}
            variants={item}
            type="submit"
            size="lg"
            w="100%"
            mt={4}
            bg="gray.200"
            _hover={{ bgColor: "gray.300" }}
            color="gray.600"
            disabled={!isDirty}
            isLoading={loading}
            _disabled={{ opacity: 0.3, pointerEvents: "none" }}
          >
            Cadastrar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
