import { Input } from "@chakra-ui/react";
import { useState } from "react";

export default function useInput(props) {
    const [value, setValue] = useState("");
    const input = <Input value={value} onChange={e => setValue(e.target.value)} {...props} />;
    return [value, input];
  }