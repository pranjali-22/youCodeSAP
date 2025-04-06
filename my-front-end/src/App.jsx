import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import LogInDonor from './pages/donor/LogInDonor.jsx';
import LogInDispatch from './pages/dispatch/LogInDispatch.jsx';
import RegisterDonor from './pages/donor/RegisterDonor.jsx';
import RegisterDispatch from './pages/dispatch/RegisterDispatch.jsx';
import DashBoardDispatch from './pages/dispatch/DashBoardDispatch.jsx';
import DashBoardDonor from './pages/donor/DashBoardDonor.jsx';
import MakeDonation from './pages/donor/MakeDonation.jsx';
import DonationHistory from './pages/donor/DonationHistory.jsx';
import Navbar from './components/Navbar.jsx';
//var _s = $RefreshSig$();
import { Box, Container, Heading, Input, Button, useToast, VStack, useColorModeValue } from "@chakra-ui/react";
import axios from "axios";
import Home from './pages/Home.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Box minH={"100vh"} bg = {useColorModeValue("gray.100", "gray.900")}>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/loginDispatch" element={<LogInDispatch />} /> 
            <Route path="/loginDonor" element={<LogInDonor />} /> 
            <Route path="/registerDispatch" element={<RegisterDispatch />} /> 
            <Route path="/registerDonor" element={<RegisterDonor />} /> 
            <Route path="/dashboardDispatch" element={<DashBoardDispatch />} /> 
            <Route path="/dashboardDonor" element={<DashBoardDonor />} />
            <Route path="/DonationHistory" element={<DonationHistory />} />
            <Route path="/MakeDonation" element={<MakeDonation />} />
        </Routes>
      </Box>
    </>
  )
}

export default App;
