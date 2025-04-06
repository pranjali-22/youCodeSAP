import { useState } from 'react';
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterDonor = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
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
        const {firstName, lastName, email, password} = userDetails;
        const type = "donor";

        if (!firstName || !lastName || !email || !password) {
            toast({
                title: "Error",
                description: "All fields are required.",
                status: "error",
                isClosable: true,
            });
            return;
        }
        //navigate('/dashboardDonor'); //TODO change w backend

        
        try {
            // TODO BACKEND
            const response = await axios.post("http://localhost:5000/api/users/register", {
                firstName,
                lastName, 
                email, 
                password,
                type,
            });

            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'User added successfully.',
                    status: 'success',
                    isClosable: true,
                });
             
            
                // Reset form after success
                setUserDetails({ 
                    firstName: '',
                    lastName: '', 
                    email: '',
                    password: ''
                });
                
                navigate('/dashboardDonor');
                
            } else {
                toast({
                    title: 'Error',
                    description: `Failed to add user. Status: ${response.status}`,
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
                    description: 'GOT ME.',
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
                Register as donor
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
                            placeholder="First Name"
                            name="firstName"
                            value={userDetails.firstName}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Last Name"
                            name="lastName"
                            value={userDetails.lastName}
                            onChange={handleInputChange}
                        />
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
                            Register
                        </Button>
                        <Button
               variant="link"
               bg = "#283C1C"
               color = "white"
               p={6} 
               w="55%"
               h="15px"
               fontSize="lg"
              onClick={() => navigate('/loginDonor')}
            >
              Log in instead
            </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default RegisterDonor;