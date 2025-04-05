import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      minHeight="100vh"
      bg="#283C1C"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start" 
      alignItems="center"
      paddingTop="40px"
    >
    <Box textAlign="center">
        <Heading fontFamily="futura-pt" as="h1" size="2xl"color="white"  mb={6}>
          Food Stash X SAP
        </Heading>
        <Text fontFamily="futura-pt" fontSize="lg" color="white" mb={6}>
          Help fight food waste
        </Text >
        <img src="https://images.squarespace-cdn.com/content/v1/5bd8b1c31137a631121dad8f/1558129346153-AT97QSVWTV6XM3CL7159/foodstash-primary-logoset.png?format=750w" 
             style={{ width: '60%', maxWidth: '500px', height: 'auto' }} />
        {/* Buttons side by side */}
        <HStack spacing={6} justify="center">
          <Link to='/loginDispatch'>
            <Button fontFamily="futura-pt" bg="#F58514" color="white" size="lg">
              I am a dispatcher
            </Button>
          </Link>
          <Link to='/loginDonor'>
            <Button fontFamily="futura-pt" bg="#F58514" color="white" size="lg">
              I am a donor
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Home;