import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogInDispatch = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: ""
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const {email, password} = userDetails;
        const type = "dispatch";

        if (!email || !password) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                isClosable: true,
            });
            return;
        }

        navigate('/dashboardDispatch'); // TODO change w backend 

        try {
            // TODO BACKEND
            const response = await axios.post("http://localhost:5000/api/users/login", {
                email, 
                password,
                type,
            });

            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'User logged in successfully.',
                    status: 'success',
                    isClosable: true,
                });
             
            
                // Reset form after success
                setUserDetails({ 
                    email: '',
                    password: ''
                });

                navigate('/dashboardDispatch');

            } else {
                toast({
                    title: 'Error',
                    description: `Failed to log in user. Status: ${response.status}`,
                    status: 'error',
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error adding user:', error);
            
            // Log error details for better debugging
            if (error.response) {
                console.error('Error response:', error.response);
                toast({
                    title: 'Error',
                    description: `API Error: ${error.response.data.error}`,
                    status: 'error',
                    isClosable: true,
                });
            } else {
                toast({
                    title: 'Error',
                    description: 'Something went wrong.',
                    status: 'error',
                    isClosable: true,
                });
            }
        }
    };

    return (
        <Container maxW="container.sm">
            <VStack spacing={12}>
                <Heading as="h1" size="2xl" textAlign="center" mb={8}>
                    Log in as dispatcher
                </Heading>
                <Box
                    w="300px"
                    bg={useColorModeValue("white", "gray.800")}
                    p={6}
                    rounded="lg"
                    shadow="md"
                >
                    <VStack spacing={10}>
                        <Input
                            placeholder="Email"
                            name="email"
                            type="email"
                            value={userDetails.email}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={userDetails.password}
                            onChange={handleInputChange}
                        />
                        <Button color="white" bg="#F8993A" onClick={handleSubmit} w="full" _hover={{ opacity: 0.3}}>
                            Log in
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default LogInDispatch;