import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, VStack, Heading, Text, Checkbox } from '@chakra-ui/react';

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


    const handleSelectDonation = () => {
        navigate('/selectDonation'); // goto selectionDonation
    };

    return (
        <Box>
            <VStack spacing={6} align="center" justify="center" padding={8}>
                <Heading as="h1" size="xl">Dashboard Dispatch</Heading>
                
                <Heading as="h2" size="md" mt={8}>Donations</Heading>
                
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
                                <Text>Donation Amount: ${donation.amount}</Text>
                                <Text>Date: {new Date(donation.date).toLocaleDateString()}</Text>
                            </Checkbox>
                        </Box>
                    ))
                )}
            </VStack>
        </Box>
    );
}

export default DashBoardDispatch;
