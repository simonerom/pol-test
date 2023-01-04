import {
  Badge,
  Center,
  Container,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import VerifyButton from "../../components/VerifyButton";
import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function App() {
  const [latitude, latitudeInput] = useInput(
    { type: "number", placeholder: "Latitude", mb: 6 },
    50.08
  );
  const [longitude, longitudeInput] = useInput(
    { type: "number", placeholder: "Longitude", mb: 6 },
    14.42
  );
  const [distance, distanceInput] = useInput(
    { type: "number", placeholder: "Max Distance", mb: 6 },
    1000
  );
  const [from, fromInput] = useInput(
    { type: "datetime-local", placeholder: "From", mb: 6 },
    "2021-01-04T00:00"
  );
  const [to, toInput] = useInput(
    { type: "datetime-local", placeholder: "From", mb: 6 },
    "2021-01-04T23:00"
  );

  const [status, setStatus] = useState(0);
  return (
    <div>
      <Container height="100vh" mt={12} alignContent={"Center"}>
        <Flex direction="column" background={"gray.100"} p={12} rounded={6}>
          <Heading mb={6}>Input location coordinates</Heading>
          {latitudeInput}
          {longitudeInput}
          {distanceInput}
          <Flex direction="row">
            {fromInput}
            {toInput}
          </Flex>
          <VerifyButton
            colorScheme="teal"
            onSuccess={(data) => {
              setStatus(data.length);
            }}
            latitude={latitude}
            longitude={longitude}
            distance={distance}
            from={from}
            to={to}
          ></VerifyButton>

          <Center mt={6}>
            <Heading size={"md"}>Proof Result</Heading>
          </Center>
          <Center mt={6}>
            {status == 0 ? (
              <CloseIcon color="red.500" boxSize="2em" />
            ) : (
              <CheckIcon color="green.500" boxSize="2em" />
            )}
          </Center>
        </Flex>
      </Container>
    </div>
  );
}
