import { ChakraProvider } from "@chakra-ui/react";
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import { RecoilRoot } from "recoil";
import '../styles.css' 

const client = createClient({
    provider: getDefaultProvider('mainnet'),
    autoConnect: true
})

export default function App({ Component, pageProps }) {
    return (
        <RecoilRoot>
        <WagmiConfig client={client}>
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
        </WagmiConfig>
        </RecoilRoot>
    )
}