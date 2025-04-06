import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DummyDonations from './DummyDonations';
import { Box, Button, VStack, Heading, HStack, Grid, Text } from '@chakra-ui/react';

function DashBoardDonor() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [firstName, setFirstName] = useState(localStorage.getItem("firstName") || "");
    const userId = localStorage.getItem("userId");


    // TODO analytics 
    const totalWeight = donations.reduce((sum, donation) => sum + (donation.quantity || 0), 0);
    const estimatedCO2eSaved = (totalWeight * 2.5).toFixed(1); // assume 2.5 lbs CO2e saved per 1 lb of food
    const totalDonVal = (totalWeight * 3.58).toFixed(2);

    // get donations
    useEffect(() => {

        //
        const fetchUserData = async () => {
            try {
                // Fetch user data from backend (assuming you have a user endpoint)
                const userResponse = await axios.get('http://localhost:5000/api/users/getUser'); 
                setFirstName(userResponse.data.firstName); // Assuming response has the first name
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();

        //setDonations(DummyDonations);
        const fetchDonations = async () => {
            try {
                //TODO use backend
                const response = await axios.get('http://localhost:5000/api/donations/getDonations');
                const resultArray = response.data.filter(item =>
                  item.userId?._id === userId
                );                
                console.log(resultArray);
                setDonations(resultArray); // Assuming response.data contains an array of donations
            } catch (error) {
                console.error("Error fetching donations:", error);
            }

        };

        fetchDonations();
    }, []);

    const handleMakeDonation = () => {
        navigate('/makeDonation'); // goto makeDonation
    };

    return (<>
      <Box
      as="a"
      href="https://www.foodstash.ca/food-supplier-form"
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"       
      top={2}                
      left={2}
      right={2}
      zIndex={1000}
      bg="#283C1C"
      color="white"
      textAlign="center"
      py={1}
      fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'
      fontWeight="bold"
      fontSize="lg"
      _hover={{ opacity:"0.5", textDecoration: "underline" }}
    >
      Want to schedule regular donations? Sign up here!
    </Box>
        <Box width="100%" minH="100vh" bg="gray.50" py={10}>
        <VStack spacing={8} align="center" justify="center" maxW="900px" mx="auto" px={4}>
          {/* Analytics Section */}
          <HStack spacing={9} align="start" width="100%" justify="left">
        {/* Your Impact Box */}
        <Box
          width="250px"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          textAlign="left"
        >
          <Heading fontSize="lg" mb={2}>Your Impact 🌍</Heading>
          <Text>Total CO₂e Saved: <strong>{estimatedCO2eSaved} lbs</strong></Text>
          <Text>Total Food Donated: <strong>{totalWeight} lbs</strong></Text>
          <Text>Total Donation Value: <strong>${totalDonVal}</strong></Text>
        </Box>

        {/* Donor Dashboard Header */}
        <Heading
          fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif'
          as="h1"
          size="xl"
          textAlign="left"
          flex="1"
        >
          {firstName ? `${firstName.charAt(0).toUpperCase() + firstName.slice(1)}'s Dashboard` : 'Donor Dashboard'}
        </Heading>
      </HStack>

    
          {/* Make Donation Button */}
          <Button
            fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'
            onClick={handleMakeDonation}
            bg="#F58514"
            color="white"
            size="lg"
            _hover={{ opacity: 0.5 }}
          >
            Make a Donation
          </Button>
    
          {/* Previous Donations Section */}
          <Box width="100%">
            <Heading
              fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif'
              as="h2"
              size="md"
              mb={4}
            >
              Previous Donations
            </Heading>
    
            {donations.length === 0 ? (
              <Text fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' >
                No previous donations found.
              </Text>
            ) : (
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={6}
                width="100%"
              >
                {donations.map((donation) => (
                  <Box key={donation._id} p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                    <Text>Category: {donation.type}</Text>
                    <Text>Weight: {donation.quantity}lb</Text>
                    <Text>Expiry Date: {donation.expiryDate.split('T')[0]}</Text>
                    <Text>Location: {donation.location}</Text>
                    {donation.pickedBy && (
                      <Text>
                        Picked up by: {donation.pickedBy.firstName} {donation.pickedBy.lastName}
                      </Text>
                    )}
                  </Box>
                ))}
              </Grid>
            )}
          </Box>
        </VStack>
      </Box>
      </>
    );
}

export default DashBoardDonor;
