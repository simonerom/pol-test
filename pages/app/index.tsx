import { Flex, Heading, Input } from "@chakra-ui/react";
import VerifyButton from "../../components/VerifyButton";
import React, { useState } from 'react';
import useInput from "../../hooks/useInput";


export default function App() {
  const [latitude, latitudeInput] = 
    useInput({type: "number", placeholder: "Latitude", mb: 6});
  const [longitude, longitudeInput] = 
    useInput({type: "number", placeholder: "Longitude", mb: 6});
  const [distance, distanceInput] = 
    useInput({type: "number", placeholder: "Max Distance", mb: 6});
  
  return (
    <div>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={"gray.100"} p={12} rounded={6}>
          <Heading mb={6}>Input location coordinates</Heading>
          {latitudeInput}
          {longitudeInput}
          {distanceInput}
          <VerifyButton colorScheme="teal" mb={6} 
            latitude={latitude} 
            longitude={longitude} 
            distance={distance}>
          </VerifyButton>
        </Flex>
      </Flex>
    </div>
  )
}