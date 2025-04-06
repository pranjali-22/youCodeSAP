import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DummyDonations from './DummyDonations';
import { Box, Button, VStack, Heading, Grid, Text } from '@chakra-ui/react';

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
                const userResponse = await axios.get('http://localhost:5000/api/users'); 
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
        <Box>
            <VStack spacing={6} align="center" justify="center" padding={8}>
                <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h1" size="xl">
                {firstName ? `${firstName}'s Dashboard` : 'Donor Dashboard'}
                </Heading>
                
                {/* Button to make a donation */}
                <Button fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' onClick={handleMakeDonation} bg="#F58514" color="white" size="lg"  _hover={{ opacity: 0.5}}>
                    Make a Donation
                </Button>
                
                <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h2" size="md" mt={8}>
                    Previous Donations</Heading>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={6} width="full">
                    {donations.length === 0 ? (
                    <Text fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' >
                        No previous donations found.</Text>
                ) : (
                    donations.map((donation) => (
                        <Box key={donation.id} padding={4} shadow="md" borderWidth="1px" width="full">
                            <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' >Category: {donation.type}</Text>
                            <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' >Weight: {donation.quantity}lb </Text>
                            <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' >Expiry Date: {donation.expiryDate}</Text>
                            <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' >Location: {donation.location}</Text>
                        
                            <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' >Picked up by: {donation.dispatcher}</Text>
                            {/* TODO dispatcher field */}
                        </Box>
                    ))
                )}
                  </Grid>
            </VStack>
        </Box>
    );
}

export default DashBoardDonor;
