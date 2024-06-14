import { VStack, Heading, Text, Button, Table, Thead, Tbody, Tr, Th, Td, useClipboard } from '@chakra-ui/react';

interface CompletionScreenProps {
  inputs: string[];
  timeLeft: number;
  onRestart: () => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ inputs, timeLeft, onRestart }) => {
  const hasPassed = inputs[0].toLowerCase().trim() === 'ok' && 
                    inputs[1] !== '' && 
                    inputs.slice(2).every(input => input === '');

  const resultMessage = hasPassed 
    ? "Congratulations, you've passed the test!" 
    : "You've failed the test. Pay attention next time!";

  const allAnswers = inputs.map((input, index) => `Q${index + 1}: ${input || '(No answer)'}`).join(' | ');
  const shareMessage = `I just took the Three Minute Test! Try it out: https://3-minute-test.softwaredesign.ing/`;

  const { hasCopied, onCopy } = useClipboard(shareMessage);


  return (
    <VStack spacing={6} align="stretch" width="100%" maxWidth="800px">
      <Heading size="xl" textAlign="center">Test Completed!</Heading>
      <Text fontSize="xl" textAlign="center" fontWeight="bold" color={hasPassed ? "green.500" : "red.500"}>
        {resultMessage}
      </Text>
      <Text fontSize="lg" textAlign="center">
        Remember, you were only supposed to do steps 1 and 2. 
        Time remaining: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </Text>
      
      <Button colorScheme="green" onClick={onCopy}>
        {hasCopied ? "Link Copied!" : "Share"}
      </Button>
      <Button colorScheme="blue" onClick={onRestart}>Restart Test</Button>
    </VStack>
  );
};

export default CompletionScreen;