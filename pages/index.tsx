import { Button, Heading, Link, VStack } from "@chakra-ui/react"

const IndexPage = () => (
  <VStack height="100vh"  alignItems="center" justifyContent="center">
    <Heading>Welcome to Get Proof Of Location!</Heading>
    <p>Get Proof Of Location is a service that allows you to prove your location at a specific time.</p>
    <p>It is a service that is built on top of the IoTeX <a href="https://w3bstream.com/">W3bstream</a> platform.</p>
    <Button><Link href="/app"> Open App</Link></Button>
  </VStack>
)

export default IndexPage
