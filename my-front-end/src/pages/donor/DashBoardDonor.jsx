import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DummyDonations from './DummyDonations';
import { Box, Button, VStack, Heading, Text } from '@chakra-ui/react';

function DashBoardDonor() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    
    // get donations
    useEffect(() => {
        setDonations(DummyDonations);
        const fetchDonations = async () => {
            try {
                //TODO use backend
                const response = await axios.get('http://localhost:5000/api/donations/');
                setDonations(response.data); // Assuming response.data contains an array of donations
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
                <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h1" size="xl">Donor Dashboard</Heading>
                
                {/* Button to make a donation */}
                <Button fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif' onClick={handleMakeDonation} bg="#F58514" color="white" size="lg"  _hover={{ opacity: 0.5}}>
                    Make Donation
                </Button>
                
                <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h2" size="md" mt={8}>Previous Donations</Heading>
                
                {/* Display previous donations */}
                {donations.length === 0 ? (
                    <Text fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' >No previous donations found.</Text>
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
            </VStack>
        </Box>
    );
}

export default DashBoardDonor;
