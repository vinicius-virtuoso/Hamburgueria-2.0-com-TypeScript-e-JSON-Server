import { useState, useEffect, useCallback, forwardRef } from "react";
import {
  FormControl,
  FormErrorMessage,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";

import { FieldError } from "react-hook-form";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

interface InputProps extends ChakraInputProps {
  placeholder: string;
  error?: FieldError | null;
  icon?: IconType;
  variants?: {
    hidden: { y: number; opacity: number };
    visible: {
      y: number;
      opacity: number;
    };
  };
}

type inputVariationOptions = {
  [key: string]: string;
};

const inputVariations: inputVariationOptions = {
  error: "red.500",
  default: "gray.100",
  focus: "gray.200",
  filled: "green.500",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, error = null, icon: Icon, ...rest }: InputProps, ref) => {
    const [inputState, setInputState] = useState("default");
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      if (error) {
        setInputState("error");
      }
    }, [error]);

    const handleInputFocus = useCallback(() => {
      if (!error) {
        setInputState("focus");
      }
    }, [error]);

    const handleInputBlur = useCallback(() => {
      if (inputValue.length > 1 && !error) {
        setInputState("filled");
      }
    }, [error, inputValue]);

    return (
      <FormControl isInvalid={!!error}>
        <InputGroup flexDir="column" justifyContent="center">
          {Icon && (
            <InputLeftElement h="100%" color={inputVariations[inputState]}>
              <Icon />
            </InputLeftElement>
          )}
          <ChakraInput
            as={motion.input}
            name={name}
            variant="outline"
            bg="gray.50"
            _hover={{ bgColor: "gray.200" }}
            _placeholder={{ color: "gray.600", opacity: 0.6 }}
            _focusVisible={{ borderColor: "gray.700", color: "gray.800" }}
            size="lg"
            color={inputVariations[inputState]}
            borderColor={inputVariations[inputState]}
            onFocus={handleInputFocus}
            onBlurCapture={handleInputBlur}
            onChangeCapture={({ currentTarget }) =>
              setInputValue(currentTarget.value)
            }
            ref={ref}
            {...rest}
          />
        </InputGroup>
        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);
