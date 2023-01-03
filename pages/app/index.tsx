import { Button, Flex, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";
import VerifyButton from "../../components/VeirfyButton";

export default function App() {
  return (
    <div>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex direction="column" background={"gray.100"} p={12} rounded={6}>
          <Heading mb={6}>Input location coordinates</Heading>
          <Input placeholder="Latitude" variant="outline" size="lg" mb={6}/>
          <Input placeholder="Longitude" variant="outline" size="lg" mb={6} />
          <Input placeholder="Max Distance"  variant="outline" size="lg" mb={6} />
          <VerifyButton colorScheme="teal" mb={6}>Verify</VerifyButton>
        </Flex>
      </Flex>
    </div>
  )
}