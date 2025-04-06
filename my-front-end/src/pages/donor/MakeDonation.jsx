import { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading, useToast
} from '@chakra-ui/react';
import axios from 'axios';

function MakeDonation() {
  const [formData, setFormData] = useState({
    userId: "609b1f1c8b65f5a9d8a8b7c1",
    perishable: true,
    type: 'Produce',
    quantity: '',
    expiryDate: '',
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
      quantity: Number(formData.quantity)
    };

    try {
    console.log(payload);
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
        perishable: 'Yes',
        type: 'Produce',
        quantity: '',
        expiryDate: '',
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
            <FormLabel>Perishable? </FormLabel>
            <Select name="perishable" value={formData.perishable} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Food Category</FormLabel>
            <Select name="type" value={formData.type} onChange={handleChange}>
              <option value="bakery">Bakery</option>
              <option value="deli">Deli</option>
              <option value="dairy&eggs">Dairy&Eggs</option>
              <option value="produce">Produce</option>
              <option value="meat&seafood">Meat&Seafood</option>
              <option value="pantry">Pantry</option>
              <option value="frozen">Frozen</option>
              <option value="miscellaneous">Miscellaneous</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Weight (lbs)</FormLabel>
            <Input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="1"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
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

          <Button type="Submit" colorScheme="blue" width="full">
            Submit Donation
          </Button>
        </VStack>
      </form>
    </Box>
    </Box>
  );
}

export default MakeDonation;
