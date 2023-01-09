import {
  Center,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import VerifyButton from "../../components/VerifyButton";
import React, { useState } from "react";
import useInput from "../../hooks/useInput";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { historyState, queryState } from "../../atoms/history";
import HistoryContainer from "../../components/HistoryContainer";
import { Divider } from '@chakra-ui/react'


export default function App() {
  const query = useRecoilValue(queryState);
  const setHistory = useSetRecoilState(historyState);
  const [history, setHistoryState] = useRecoilState(historyState);

  const [latitude, latitudeInput] = useInput(
    { type: "number", placeholder: "Latitude", mb: 6 },
    query.latitude
  );
  const [longitude, longitudeInput] = useInput(
    { type: "number", placeholder: "Longitude", mb: 6 },
    query.longitude
  );
  const [distance, distanceInput] = useInput(
    { type: "number", placeholder: "Max Distance", mb: 6 },
    query.distance
  );
  const [from, fromInput] = useInput(
    { type: "datetime-local", placeholder: "From", mb: 6 },
    query.from
  );
  const [to, toInput] = useInput(
    { type: "datetime-local", placeholder: "From", mb: 6 },
    query.to
  );

  // Add history item
  const addHistoryItem = () => {
    setHistory((oldHistory) => 
    [
      ...oldHistory, 
      {
        id: oldHistory.length,
        latitude: Number(latitude),
        longitude: Number(longitude),
        distance: Number(distance),
        from: '2020-01-01',
        to: '2020-01-02',
      }
    ]);
    console.log("history", history);
  };


  const [queryResult, setStatus] = useState(0);
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
              addHistoryItem();
            }}
            latitude={latitude}
            longitude={longitude}
            distance={distance}
            from={from}
            to={to}
          ></VerifyButton>
        <Center>
            {queryResult == 0 ? (
              <HStack mt={6}>
              <CloseIcon color="red.500" boxSize="1em" />
              <Text>No proof found</Text>
              </HStack>
            ) : (
              <HStack mt={6}>
              <CheckIcon color="green.500" boxSize="1em" />
              <Text ml={3} color="green.500">Location proven</Text>
              </HStack>
            )}
          </Center>
          <Divider orientation="horizontal" color={"black"} mb={6}/>
          { history.length > 0 && <HistoryContainer /> }
        </Flex>
      </Container>
    </div>
  );
}

