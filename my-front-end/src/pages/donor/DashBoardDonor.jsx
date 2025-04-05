import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, VStack, Heading, Text } from '@chakra-ui/react';

function DashBoardDonor() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    
    // get donations
    useEffect(() => {
        const fetchDonations = async () => {
            try {
                // TODO use backend
                const response = await axios.get('http://localhost:5000/api/donations');
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
                <Heading as="h1" size="xl">Dashboard Donor</Heading>
                
                {/* Button to make a donation */}
                <Button onClick={handleMakeDonation} bg="#F58514" color="white" size="lg">
                    Make Donation
                </Button>
                
                <Heading as="h2" size="md" mt={8}>Previous Donations</Heading>
                
                {/* Display previous donations */}
                {donations.length === 0 ? (
                    <Text>No previous donations found.</Text>
                ) : (
                    donations.map((donation) => (
                        <Box key={donation.id} padding={4} shadow="md" borderWidth="1px" width="full">
                            <Text>Donation Amount: ${donation.amount}</Text>
                            <Text>Date: {new Date(donation.date).toLocaleDateString()}</Text>
                            {/* You can display more donation details here */}
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
}

export default DashBoardDonor;
