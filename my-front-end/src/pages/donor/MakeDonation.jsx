import { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading, useToast
} from '@chakra-ui/react';
import axios from 'axios';

function MakeDonation() {
  const [formData, setFormData] = useState({
    category: 'perishable',
    weight: '',
    expiry_date: '',
    location: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      weight: Number(formData.weight)
    };

    try {
      const res = await axios.post('http://localhost:5000/api/donations/add/', payload);
      toast({
        title: 'Donation submitted!',
        description: `Your donation ID is ${res.data.donation_id}`,
        status: 'success',
        duration: 5000,
        isClosable: true
      });

      // Clear the form after submission
      setFormData({
        category: 'perishable',
        weight: '',
        expiry_date: '',
        location: ''
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: 'Submission failed',
        description: 'Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
    }
  };

  return (
    <Box
      bg="white"
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
    <Box maxW="600px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" shadow="md"
    bg="white" >
      <Heading mb={6}>Make a Donation</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Food Category</FormLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option value="perishable">Perishable</option>
              <option value="produce">Produce</option>
              <option value="frozen">Frozen</option>
              <option value="pantry">Pantry</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Weight (lbs)</FormLabel>
            <Input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="1"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Submit Donation
          </Button>
        </VStack>
      </form>
    </Box>
    </Box>
  );
}

export default MakeDonation;
