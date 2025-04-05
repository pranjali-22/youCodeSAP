import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      minHeight="100vh"
      bg="gray.100"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={6} textAlign="center">
        <Heading as="h1" size="2xl">
          Welcome to My Web App
        </Heading>
        <Text fontSize="lg" color="gray.600">
          This is the front page of your app. You can add more content and style it however you like.
        </Text>
        <Link to='/loginDispatch'>
        <Button colorScheme="blue" size="lg">
            I am a dispatcher
          </Button>
        </Link>
        <Link to='/loginDonor'>
        <Button colorScheme="blue" size="lg">
            I am a donor
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default Home;