import {
  Box,
  Button,
  Heading,
  Text,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { historyState, queryState } from "../atoms/history";

function formatFixedSize(lat, unit = "") {
  return (
    <Box>
      <Text>{(String(lat) + unit).padEnd(10)}</Text>
    </Box>
  );
}

export default function HistoryContainer() {
  const [history, setHistory] = useRecoilState(historyState);
  const [query, setQuery] = useRecoilState(queryState);

  const onSetQuery = (item) => {
    console.log(`Old query: `, query);
    setQuery(item);
    console.log(`New query: `, query);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div>
      <Heading size={"md"} mb={6}>
        History
      </Heading>

      {history.map((item) => (
        <Grid
          fontFamily={"Courier"}
          mb={6}
          key={item.id}
          templateRows="repeat(2, 1fr)"
          templateColumns="2fr 2fr 1fr 2fr 2fr 1fr"
          gap={2}
          fontSize={"xs"}
        >
          <GridItem fontWeight={"bold"}>Latitude</GridItem>
          <GridItem fontWeight={"bold"}>Longitude</GridItem>
          <GridItem fontWeight={"bold"}>Distance</GridItem>
          <GridItem fontWeight={"bold"}>From</GridItem>
          <GridItem fontWeight={"bold"}>To</GridItem>
          <GridItem rowSpan={2}>
            <Button colorScheme={"cyan"}>Set</Button>
          </GridItem>
          <GridItem alignContent={"Center"} fontFamily={"Courier"}>
            {formatFixedSize(item.latitude, "°")}
          </GridItem>
          <GridItem fontFamily={"Courier"}>
            {formatFixedSize(item.longitude, "°")}
          </GridItem>
          <GridItem fontFamily={"Courier"}>
            {formatFixedSize(item.distance, "m")}
          </GridItem>
          <GridItem fontFamily={"Courier"}>
            {formatFixedSize(item.from, "")}
          </GridItem>
          <GridItem fontFamily={"Courier"}>
            {formatFixedSize(item.to, "")}
          </GridItem>
        </Grid>
      ))}

      <Button colorScheme={"blackAlpha"}>
        <Link onClick={clearHistory} size={"sm"} colorScheme={"yellow"}>
          Clear History
        </Link>
      </Button>
    </div>
  );
}
