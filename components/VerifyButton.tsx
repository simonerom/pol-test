import { Badge, Button, Spinner, VStack } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { SiweMessage } from "siwe";
import moment from "moment";
import { useSignMessage } from "wagmi";
import axios from "axios";
import { useState } from "react";
import { ResultType } from "@remix-run/router/dist/utils";

const GEOSTREAM_API = "https://geo-test.w3bstream.com/api/pol";

function createSiweMessage(
  address: string,
  latitude: number,
  longitude: number,
  distance: number,
  from: string,
  to: string
) {
  const locations = [
    {
      scaled_latitude: latitude,
      scaled_longitude: longitude,
      distance: distance,
      from: from,
      to: to,
    },
  ];

  const message = new SiweMessage({
    domain: globalThis.location.host,
    address: address,
    statement: `Sign in Location Based NFT The application will know if you were located in one of the following regions in the time range below:locations:${locations.join(
      ","
    )}`,
    uri: globalThis.location.origin,
    version: "1",
    chainId: 4689,
    expirationTime: moment().add(5, "minutes").toISOString(),
  });

  return message.prepareMessage();
}

async function QueryPolAPI(
  locations,
  address: string,
  signature: string,
  message: string | Uint8Array
) {
  const body = {
    signature: signature,
    message: message,
    owner: address,
    locations: locations,
  };
  console.log(`Querying GeoStream API with body: `, body);
  console.log(`Querying GeoStream API with endpoint: `, GEOSTREAM_API);
  
  const response = await axios.post(GEOSTREAM_API, body).catch((error) => {
    console.log(`Querying GeoStream API failed with error: ${error}.`);
    console.log("Endpoint: ", GEOSTREAM_API);
    console.log("Body: ", body);
  });
  console.log(`Query result.`, response);
  if (typeof response === "object")
    return response.data.result.data;
}

export default function VerifyButton({onSuccess, ...props}) {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const [isQuerying, setIsQuerying] = useState(false);

  const locations = [
    {
      scaled_latitude: props.latitude * 1e6,
      scaled_longitude: props.longitude * 1e6,
      distance: props.distance,
      from: moment(props.from).unix(),
      to: moment(props.to).unix(),
    },
  ];

  console.log(`Locations: `, locations);

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify siwe message when sign message succeeds
      console.log(`Signdature done: ${data}`);
      setIsQuerying(true);
      QueryPolAPI(locations, address, data, variables.message)
        .then((data) => {
          console.log(`Query done.`);
          console.log(`Data: `, data);
          if (data) {
            props.onSuccess(data);
          }
        })
        .finally(() => {
          setIsQuerying(false);
        });
    },
  });

  if (!isConnected) {
    return (
      <Button {...props} onClick={ () => connect} colorScheme={"yellow"}>
        Connect Wallet
      </Button>
    );
  } else {
    return (
      <VStack>
        <Button
          {...props}
          colorScheme="yellow"
          variant="solid"
          size="lg"
          onClick={() => {
            let message = createSiweMessage(
              address,
              props.latitude,
              props.longitude,
              props.distance,
              String(props.from * 1e6),
              String(props.to * 1e6)
            );
            signMessage({ message });
          }}
        >
          {isLoading ? (
            "Signing in Wallet..."
          ) : isQuerying ? (
            <Spinner />
          ) : (
            "Request Proof"
          )}
        </Button>
        <Badge mb={6} colorScheme="gray">
          {" "}
          {address}
        </Badge>
        <Button
          size={"xs"}
          {...props}
          onClick={ () => disconnect}
          colorScheme={"blackAlpha"}
        >
          Disconnect
        </Button>
      </VStack>
    );
  }
}
