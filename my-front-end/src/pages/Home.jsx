import React from 'react';
import { Box, Heading, Text, Button, VStack, HStack, useColorModeValue} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  const textColor = useColorModeValue("#283C1C", "white");
  return (
    <Box
      minHeight="100vh"
      bg="#white"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start" 
      alignItems="center"
      paddingTop="40px"
    >
    <Box textAlign="center">
        <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h1" size="2xl"color={textColor}  mb={6}>
          Food Stash X SAP
        </Heading>
        <Text fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' fontSize="lg" color={textColor} mb={6}>
          Help fight food waste
        </Text >
        <img src="https://images.squarespace-cdn.com/content/v1/5bd8b1c31137a631121dad8f/1558129346153-AT97QSVWTV6XM3CL7159/foodstash-primary-logoset.png?format=750w" 
             style={{ width: '60%', maxWidth: '500px', height: 'auto', margin: '0 auto', paddingBottom: '30px'}} />
        {/* Buttons side by side */}
        <HStack spacing={6} justify="center">
          <Link to='/registerDispatch'>
            <Button fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' bg="#F58514" color="white" size="lg">
              I am a dispatcher
            </Button>
          </Link>
          <Link to='/registerDonor'>
            <Button fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' bg="#F58514" color="white" size="lg">
              I am a donor
            </Button>
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Home;