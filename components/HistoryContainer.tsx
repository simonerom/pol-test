import { Button, Divider, Flex, Grid, GridItem, Heading, HStack, Link, SimpleGrid } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { historyState, queryState } from "../atoms/history";

export default function HistoryContainer() {
    const [history, setHistory] = useRecoilState(historyState);
    const [query, setQuery] = useRecoilState(queryState);
    
    const onSetQuery = (item) => {
        console.log(`Old query: `, query);
        setQuery(item);
        console.log(`New query: `, query);
    }

    const clearHistory = () => {
        setHistory([]);
    }

    return (
        <div>
            <Heading size={"md"}>History</Heading>
            <ul>
                {history.map((item) => (
                    <div key={item.id}>
                        <SimpleGrid columns={6} gridAutoColumns={""} gap={6}>
                            <GridItem>{item.latitude}</GridItem>
                            <GridItem>{item.longitude}</GridItem>
                            <GridItem>{item.distance}m</GridItem>
                            <GridItem>{item.from}</GridItem>
                            <GridItem>{item.to}</GridItem>
                            <GridItem>
                                <Button flex="1" onClick={() => onSetQuery(item)} colorScheme={"cyan"} size={"sm"} m={2}>Set</Button>
                            </GridItem>
                        </SimpleGrid>
                    </div>
                ))}
            </ul>
            <Link onClick={clearHistory} size={"sm"} colorScheme={"yellow"}>Clear History</Link>
            </div>
    );
}