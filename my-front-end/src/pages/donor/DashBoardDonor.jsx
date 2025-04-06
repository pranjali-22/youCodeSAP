import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DummyDonations from './DummyDonations';
import { Box, Button, VStack, Heading, HStack, Grid, Text } from '@chakra-ui/react';

function DashBoardDonor() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [firstName, setFirstName] = useState("");

    // TODO analytics 
    const totalWeight = donations.reduce((sum, donation) => sum + (donation.quantity || 0), 0);
    const estimatedCO2eSaved = (totalWeight * 2.5).toFixed(1); // assume 2.5 lbs CO2e saved per 1 lb of food

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

        setDonations(DummyDonations);
        const fetchDonations = async () => {
            try {
                //TODO use backend
                const response = await axios.get('http://localhost:5000/api/donations/getDonations');
                const resultArray = response.data.filter(item => item.userId === '609b1f1c8b65f5a9d8a8b7c1' );
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

    return (
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
          <Text>Total CO₂e Saved: <strong>{estimatedCO2eSaved} kg</strong></Text>
          <Text>Total Food Donated: <strong>{totalWeight} lbs</strong></Text>
        </Box>

        {/* Donor Dashboard Header */}
        <Heading
          fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif'
          as="h1"
          size="xl"
          textAlign="left"
          flex="1"
        >
          {firstName ? `${firstName}'s Dashboard` : 'Donor Dashboard'}
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
                  <Box key={donation.id} p={4} shadow="md" borderWidth="1px" borderRadius="md" bg="white">
                    <Text>Category: {donation.type}</Text>
                    <Text>Weight: {donation.quantity}lb</Text>
                    <Text>Expiry Date: {donation.expiryDate}</Text>
                    <Text>Location: {donation.location}</Text>
                    {/* TODO 
                    <Text>Picked up by: {donation.dispatcher}</Text>
                    */}
                  </Box>
                ))}
              </Grid>
            )}
          </Box>
        </VStack>
      </Box>
    );
}

export default DashBoardDonor;
