import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DummyDonations from './DummyDonations';
import { Box, Button, Grid, VStack, Heading, Text, Checkbox } from '@chakra-ui/react';

function DashBoardDispatch() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [selectedDonations, setSelectedDonations] = useState([]); // track selected
    
    // get donations
    useEffect(() => {
        const fetchDonations = async () => {
            try {
                // TODO use backend
                const response = await axios.get('http://localhost:5000/api/donations/');
                setDonations(response.data); // Assuming response.data contains an array of donations
            } catch (error) {
                console.error("Error fetching donations:", error);
            }
        };

        fetchDonations();
        //TODO get rid of
        setDonations(DummyDonations);
    }, []);


    const handleDonationSelect = (id) => {
        setSelectedDonations((prevSelected) => {
            if (prevSelected.includes(id)) {
                // deselect if already selected
                return prevSelected.filter((donationId) => donationId !== id);
            } else {
                // else add donation
                return [...prevSelected, id];
            }
        });
    };

    const handleConfirmSelection = async () => {
        try {
            console.log(selectedDonations);
            const response = await axios.post('http://localhost:5000/api/dispatch/confirm', {
                selectedDonations
            });
            toast({
                title: "Success",
                description: "Donations confirmed for dispatch.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            // Reset selection or redirect as needed
            setSelectedDonations([]);
        } catch (error) {
            console.error("Error confirming selection:", error);
            toast({
                title: "Error",
                description: "Failed to confirm selection.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box>
            <VStack spacing={6} align="center" justify="center" padding={8}>
                <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h1" size="xl" >Dispatch Dashboard</Heading>
                
                <Heading fontFamily='"Century Gothic", "Gill Sans", "Trebuchet MS", sans-serif' as="h2" size="md" mt={8}>Donations Available for Pickup</Heading>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={6} width="full">
                    {donations.length === 0 ? (
                        <Text>No donations found.</Text>
                    ) : (
                        donations.map((donation) => (
                            <Box 
                                key={donation.id} 
                                padding={4} 
                                shadow="md" 
                                borderWidth="1px" 
                                width="full" 
                                bg={selectedDonations.includes(donation.id) ? '#F58514' : 'white'}
                            >
                                <Checkbox 
                                    isChecked={selectedDonations.includes(donation.id)} 
                                    onChange={() => handleDonationSelect(donation.id)} 
                                >
                                    <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'>Category: {donation.type}</Text>
                                    <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'>Weight: {donation.quantity}lb </Text>
                                    <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'>Expiry Date: {donation.expiryDate}</Text>
                                    <Text fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'>Location: {donation.location}</Text>
                                </Checkbox>
                            </Box>
                        ))
                    )}
                </Grid>
                
                {/* Confirm Selection Button */}
                {selectedDonations.length > 0 && (
                    <Button
                    fontFamily='"Segoe UI", "Helvetica Neue", "Arial", sans-serif'
                        bg="#283C1C"
                        color="white"
                        onClick={handleConfirmSelection}
                        mt={4}
                        _hover={{ opacity: 0.5 }}
                    >
                        Confirm Selection
                    </Button>
                )}
            </VStack>
        </Box>
    );
}
export default DashBoardDispatch;
