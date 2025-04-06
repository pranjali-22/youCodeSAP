import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DummyDonations from './DummyDonations';
import { Box, Button, VStack, Heading, Text, Checkbox } from '@chakra-ui/react';

function DashBoardDispatch() {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [selectedDonations, setSelectedDonations] = useState([]); // track selected
    
    // get donations
    useEffect(() => {
        // const fetchDonations = async () => {
        //     try {
        //         // TODO use backend
        //         const response = await axios.get('http://localhost:5000/api/donations/');
        //         setDonations(response.data); // Assuming response.data contains an array of donations
        //     } catch (error) {
        //         console.error("Error fetching donations:", error);
        //     }
        // };

        // fetchDonations();
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
                <Heading as="h1" size="xl">Dispatch Dashboard</Heading>
                
                <Heading as="h2" size="md" mt={8}>Donations Available for Pickup</Heading>
                
                {/* Display previous donations */}
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
                             <Text>Category: {donation.category}</Text>
                            <Text>Weight: {donation.weight}lb </Text>
                            <Text>Expiry Date: {donation.date}</Text>
                            <Text>Location: {donation.location}</Text>
                        
                            </Checkbox>
                        </Box>
                    ))
                )}
                 {/* Confirm Selection Button */}
                 {selectedDonations.length > 0 && (
                    <Button
                        bg="#283C1C"
                        color="white"
                        onClick={handleConfirmSelection}
                        mt={4}
                        _hover={{ opacity: 0.5}}
                    >
                        Confirm Selection
                    </Button>
                )}
            </VStack>
        </Box>
    );
}

export default DashBoardDispatch;
