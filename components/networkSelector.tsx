import { Stack, Radio, RadioGroup } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { globalState } from "../atoms/global";

export default function NetworkSelector() {
    const [global, setGlobal] = useRecoilState(globalState);
    
    const onchange = (e) => {
        console.log("e", e);
        setGlobal((oldGlobal) => {
            console.log("oldGlobal", oldGlobal);
            let newGlobal = {
                ...oldGlobal,
                testnet: e === "testnet" ? true : false,
            };
            console.log("newGlobal", newGlobal);
            return newGlobal;
                
        });
    };

    return (
        <Stack direction="row" spacing={4} mb={6}>
        <RadioGroup defaultValue="testnet" size={"lg"} onChange={onchange}>
            <Stack direction="row">
            <Radio value="testnet">Testnet</Radio>
            <Radio value="mainnet">Mainnet</Radio>
            </Stack>
        </RadioGroup>
        </Stack>
    );
}