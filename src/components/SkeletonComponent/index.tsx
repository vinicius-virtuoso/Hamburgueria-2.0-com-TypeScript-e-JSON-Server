import { Box, Flex, Skeleton } from "@chakra-ui/react";

export const SkeletonComponent = () => {
  return (
    <Box
      border="2px"
      borderColor="gray.300"
      minW={["240px", "230px", "220px", "270px"]}
      maxW={["240px", "230px", "220px", "280px"]}
      display="flex"
      flexDir="column"
      rounded={6}
      shadow="base"
      h="100%"
    >
      <Flex
        bgColor="gray.200"
        h="150px"
        alignContent="center"
        justifyContent="center"
      >
        <Skeleton maxW="100%" />
      </Flex>
      <Flex flexDir="column" p={[4, 4, 6, 8]} gap={4}>
        <Skeleton h="1.5rem" />
        <Skeleton h=".575rem" w="35%" />
        <Skeleton h="1.3rem" w="45%" />
        <Skeleton h="3rem" w="55%" />
      </Flex>
    </Box>
  );
};
