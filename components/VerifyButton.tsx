import { Button, VStack } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { SiweMessage } from "siwe";
import moment from "moment";
import { useSignMessage } from 'wagmi'


function createSiweMessage(
    address: string, latitude: number, longitude: number, distance: any) {
    const locations = [ { 
        scaled_latitude: latitude*10e6, 
        scaled_longitude: longitude*10e6, 
        distance: distance,
        from: moment().subtract(1,"days"),
        to: moment() } 
    ];

    const message = new SiweMessage({
        domain: globalThis.location.host,
        address: address,
        statement: `Sign in Location Based NFT The application will know if you were located in one of the following regions in the time range below:locations:${locations.join(',')}`,
        uri: globalThis.location.origin,
        version: "1",
        chainId: 4689,
        expirationTime: moment().add(5, "minutes").toISOString()
    });

    return message.prepareMessage();
}

export default function VerifyButton(props) {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { connect } = useConnect({
      connector: new InjectedConnector(),
    })

    const { data, error, isLoading, signMessage } = useSignMessage({
        onSuccess(data, variables) {
            // Verify siwe message when sign message succeeds
            console.log(`Signdature done: ${data}`);
        },
    });

    if (!isConnected) {
        return (
        <Button {...props} onClick={connect}>Connect Wallet</Button>
        )} else {
    return (
    <VStack>
        <Button
        {...props}
        colorScheme="yellow"
        variant="solid"
        size="lg"
        mb={6}
        onClick={ () => {
            let message = createSiweMessage(address, props.latitude, props.longitude, props.distance);
            signMessage({message}) }
        }>
        Verify {address}
        </Button>

        <Button {...props} onClick={disconnect}>Disconnect Wallet</Button>
    </VStack>
    );
    }
}