import { Button, Heading, VStack, Link } from "@chakra-ui/react"

const IndexPage = () => (
  <VStack height="100vh"  alignItems="center" justifyContent="center">
    <Heading>Welcome to Get Proof Of Location!</Heading>
    <p>Get Proof Of Location is a service that allows you to prove your location at a specific time.</p>
    <p>It is a service that is built on top of the IoTeX <a href="https://w3bstream.com/">W3bstream</a> platform.</p>
    <Link href="/app"><Button>Open App</Button></Link>
    <Link href="iopay://io.iotex.iopay/open?action=web&url=pol-test.vercel.app">
      <Button colorScheme={"pink"}>Open in ioPay</Button>
    </Link>
  </VStack>
)

export default IndexPage
