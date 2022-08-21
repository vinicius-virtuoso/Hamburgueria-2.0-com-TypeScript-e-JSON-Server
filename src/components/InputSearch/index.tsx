import React from "react";
import {
  Button,
  InputGroup,
  InputRightElement,
  InputProps,
} from "@chakra-ui/react";
import { TbSearch } from "react-icons/tb";
import { Input } from "../Form/Input";
import { motion } from "framer-motion";
import { item } from "../../styles/animate";
import { useProducts } from "../../contexts/ProductsContext";

interface SearchProps extends InputProps {
  placeholder?: string;
  display?: string[] | string;
  onBlurCapture?: () => void;
  setIsSearch?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputSearch = ({
  placeholder,
  display,
  setIsSearch,
}: SearchProps) => {
  const { getFilteredProducts } = useProducts();

  return (
    <InputGroup
      size={["lg", "lg", "lg", "md"]}
      display={display}
      width={["100%", "100%", "100%", "20rem"]}
      onBlurCapture={() => {
        if (setIsSearch) setIsSearch(false);
      }}
      as={motion.div}
      variants={item}
    >
      <Input
        type="search"
        placeholder={placeholder ? placeholder : ""}
        _focus={{ bgColor: "white" }}
        bgColor="white"
        autoFocus
        _placeholder={{ opacity: 0.4 }}
        size="lg"
        onChange={(e) => getFilteredProducts(e.target.value)}
      />
      <InputRightElement width="4.5rem" h="100%" pointerEvents="none">
        <Button
          h="1.75rem"
          size="md"
          bgColor="green.500"
          color="white"
          isLoading={false}
        >
          <TbSearch />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
