import { Input } from "@chakra-ui/react";
import { useState } from "react";

export default function useInput(props, defaultValue) {
    const [value, setValue] = useState("");
    const input = <Input  onChange={e => setValue(e.target.value)} {...props} />;
    return [value, input];
  }