import { Button } from "@chakra-ui/react";

export default function VerifyButton(props) {
    return (
        <Button
        {...props}
        colorScheme="yellow"
        variant="solid"
        size="lg"
        mb={6}
        >
        Verify
        </Button>
    );
    }