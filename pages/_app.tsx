import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'

const client = createClient({
    provider: getDefaultProvider('mainnet'),
    autoConnect: true
})

export default function App({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
        </WagmiConfig>
    )
}