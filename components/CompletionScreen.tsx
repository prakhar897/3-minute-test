import { VStack, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td,useClipboard } from '@chakra-ui/react';

interface CompletionScreenProps {
  inputs: string[];
  timeLeft: number;
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ inputs, timeLeft, onRestart }) => {
    const { hasCopied, onCopy } = useClipboard("I just took the Three Minute Test! Try it out: https://three-minute-test.vercel.app");

  const getExpectedAnswer = (step: number): string => {
    switch (step) {
      case 1: return "OK";
      case 2: return ""; // Any name is acceptable
      case 3: return "next";
      case 4: return "5";
      case 5: return "X";
      case 6: return "circle";
      case 7: return ""; // Their name again, so any input is fine
      case 8: return "yes";
      case 9: return "7 and 8";
      case 10: return "2205";
      case 11: return "followed";
      case 12: return "511";
      case 13: return "circled";
      case 14: return "1,2,3,4,5,6,7,8,9,10";
      case 15: return "leader";
      case 16: return "understood";
      default: return "";
    }
  };

  const isCorrect = (input: string, step: number): boolean => {
    const expected = getExpectedAnswer(step);
    return expected === "" || input.toLowerCase().trim() === expected.toLowerCase();
  };

  return (
    <VStack spacing={6} align="stretch" width="100%" maxWidth="800px">
      <Heading size="xl" textAlign="center">Test Completed!</Heading>
      <Text fontSize="lg" textAlign="center">
        Remember, you were only supposed to do steps 1 and 2. 
        Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Step</Th>
            <Th>Your Answer</Th>
            <Th>Correct?</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inputs.map((input, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{input || '(No answer)'}</Td>
              <Td>{isCorrect(input, index + 1) ? '✅' : '❌'}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Button colorScheme="green" onClick={onCopy}>
            {hasCopied ? "Link Copied!" : "Share"}
          </Button>

    </VStack>
  );
};

export default CompletionScreen;