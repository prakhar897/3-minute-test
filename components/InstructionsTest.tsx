import { useState, useRef, useEffect, createRef } from 'react';
import { Box, VStack, Text, Input, Button, Alert, AlertIcon, HStack } from '@chakra-ui/react';
import CompletionScreen from './CompletionScreen';

const InstructionsTest = () => {
  const [inputs, setInputs] = useState(Array(16).fill(''));
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isFinished, setIsFinished] = useState(false);
  const inputRefs = useRef(inputs.map(() => createRef<HTMLInputElement>()));

  useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, isFinished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newInputs = [...inputs];
    const currentValue = newInputs[index];
    const inputValue = e.target.value;

    if (inputValue.startsWith(currentValue)) {
      newInputs[index] = inputValue;
      setInputs(newInputs);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setInputs(Array(16).fill(''));
    setTimeLeft(180);
    setIsFinished(false);
    setShowAlert(false);
  };

  const getStepInstruction = (step: number) => {
    switch (step) {
      case 1: return "1) Read everything before you do anything. Type 'OK' to confirm.";
      case 2: return "2) Enter your name in the input field below.";
      case 3: return "3) Type the word 'next' below.";
      case 4: return "4) Visualize 4 squares. Type the number of squares you visualized.";
      case 5: return "5) Divide each square into 2 parts vertically. Type how many rectangles you have now.";
      case 6: return "6) Imagine circling each rectangle. Type 'circle' to confirm you've imagined circling each rectangle.";
      case 7: return "7) What's 7 + 8? Type your answer.";
      case 8: return "8) Type 'yes' below.";
      case 9: return "9) Type '7 and 8' to confirm you've thought about 7 and 8 numbers.";
      case 10: return "10) What is 11 × 11? Type your answer.";
      case 11: return "11) Type 'followed' if you think you've carefully carried out all instructions so far.";
      case 12: return "12) What is 64 + 36? Type your answer.";
      case 13: return "13) Write 1+1";
      case 14: return "14) Type the numbers 1 to 10 separated by commas.";
      case 15: return "15) Type 'leader' if you think you've reached this step in record pace.";
      case 16: return "16) Now that you have finished reading carefully, do only sentences 1 and 2. Type 'understood' to confirm.";
      default: return "";
    }
  };

  if (isFinished) {
    return <CompletionScreen inputs={inputs} timeLeft={timeLeft} onRestart={handleRestart} />;
  }

  return (
    <VStack spacing={4} align="stretch" width="100%" maxWidth="800px">
      {showAlert && (
        <Alert status="warning">
          <AlertIcon />
          {alertMessage}
        </Alert>
      )}
      <Text fontWeight="bold">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
      {inputs.map((input, index) => (
        <Box key={index}>
          <Text mb={2}>{getStepInstruction(index + 1)}</Text>
          <Input
            ref={inputRefs.current[index]}
            placeholder="Your response (optional)"
            value={input}
            onChange={(e) => handleInputChange(e, index)}
            onKeyPress={(e) => e.key === 'Enter' && inputRefs.current[index + 1]?.current?.focus()}
          />
        </Box>
      ))}
      <Button colorScheme="red" onClick={handleFinish}>Finish Test</Button>
    </VStack>
  );
};

export default InstructionsTest;