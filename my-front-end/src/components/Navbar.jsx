import { chakra, useClipboard, useColorModeValue } from "@chakra-ui/react";
import { Button, Box, Heading, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { LuSun } from "react-icons/lu";
import { IoMoon } from "react-icons/io5";

const Navbar = () => {
  const {colorMode, toggleColorMode} = useColorMode();
  const textColor = useColorModeValue("gray.800", "white");
  return (
    <Container maxW={"1140px"} px = {4} >
      <Flex h = {16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDir={{
              base: "column",
              sm: "row"
            }}
      >
        <Text
          fontSize={{base: "22", sm: "28"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          color={textColor}
        >
        </Text>
        <HStack spacing ={2} alignItems={"center"}>

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon size='20' /> : <LuSun size='20' />}
          </Button>
        </HStack>

      </Flex>

    </Container>
  )
};
export default Navbar;