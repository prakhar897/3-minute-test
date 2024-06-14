'use client';

import { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import InstructionsTest from '@/components/InstructionsTest';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">The Three Minute Test</Heading>
          {!started ? (
            <>
              <Text>Test your ability to follow instructions carefully!</Text>
              <Button colorScheme="blue" onClick={() => setStarted(true)}>Start Test</Button>
            </>
          ) : (
            <InstructionsTest />
          )}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}