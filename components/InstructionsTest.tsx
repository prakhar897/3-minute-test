import { useState, useRef, useEffect } from 'react';
import { Box, VStack, Text, Input, Button, Alert, AlertIcon, HStack } from '@chakra-ui/react';
import CompletionScreen from './CompletionScreen';

const InstructionsTest = () => {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState(Array(16).fill(''));
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step > 1 && timeLeft > 0 && !isFinished) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, step, isFinished]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputs = [...inputs];
    newInputs[step - 1] = e.target.value;
    setInputs(newInputs);
  };

  const handleNextStep = () => {
    if (step === 16) {
      setIsFinished(true);
      return;
    }

    setStep(step + 1);
    setShowAlert(false);
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setStep(1);
    setInputs(Array(16).fill(''));
    setTimeLeft(180);
    setIsFinished(false);
    setShowAlert(false);
  };

  const renderStepContent = () => {
    return (
      <Box>
        <Text mb={2}>{getStepInstruction(step)}</Text>
        <Input
          ref={inputRef}
          placeholder="Your response (optional)"
          value={inputs[step - 1]}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === 'Enter' && handleNextStep()}
        />
      </Box>
    );
  };

  const getStepInstruction = (step: number) => {
    switch (step) {
      case 1: return "1) Read everything before you do anything. Type 'OK' to confirm.";
      case 2: return "2) Enter your name in the input field below.";
      case 3: return "3) Type the word 'next' below.";
      case 4: return "4) Type the number of small squares you are supposed to visualize.";
      case 5: return "5) What letter should you put in each square? Type it below.";
      case 6: return "6) Type 'circle' to confirm you've imagined circling each square.";
      case 7: return "7) Type your name to confirm you've said it out loud.";
      case 8: return "8) Type 'yes' below.";
      case 9: return "9) Type '7 and 8' to confirm you've thought about circling these steps.";
      case 10: return "10) What is 7 × 315? Type your answer.";
      case 11: return "11) Type 'followed' if you think you've carefully carried out all instructions so far.";
      case 12: return "12) What is 117 + 394? Type your answer.";
      case 13: return "13) Type 'circled' to confirm you've imagined circling your previous answer.";
      case 14: return "14) Type the numbers 1 to 10 separated by commas.";
      case 15: return "15) Type 'leader' if you think you're the first to reach this step.";
      case 16: return "16) Now that you have finished reading carefully, do only sentences 1 and 2. Type 'understood' to confirm.";
      default: return "";
    }
  };

  if (isFinished) {
    return <CompletionScreen inputs={inputs} timeLeft={timeLeft} onRestart={handleRestart} />;
  }

  return (
    <VStack spacing={4} align="stretch" width="100%" maxWidth="600px">
      {showAlert && (
        <Alert status="warning">
          <AlertIcon />
          {alertMessage}
        </Alert>
      )}
      <Text fontWeight="bold">Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
      {renderStepContent()}
      <HStack spacing={4}>
        {step < 16 && <Button onClick={handleNextStep}>Next</Button>}
        <Button colorScheme="red" onClick={handleFinish}>Finish Test</Button>
      </HStack>
    </VStack>
  );
};

export default InstructionsTest;