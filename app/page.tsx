'use client';

import { useState } from 'react';
import { ChakraProvider, Box, VStack, Heading, Text, Button } from '@chakra-ui/react';
import InstructionsTest from '@/components/InstructionsTest';
import Footer from '@/components/Footer';

export default function Home() {
  const [started, setStarted] = useState(false);

  return (
    <ChakraProvider>
      <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={8}>
          <Heading as="h1" size="2xl">The Three Minute Test</Heading>
          {!started ? (
            <>
              <Button colorScheme="blue" onClick={() => setStarted(true)}>Start Test</Button>
            </>
          ) : (
            <InstructionsTest />
          )}
          <Footer />
        </VStack>
        
      </Box>
    </ChakraProvider>
  );
}