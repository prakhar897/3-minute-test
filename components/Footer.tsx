import { Box, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" width="100%" textAlign="center" py={4}>
      <Text>   
        <Link href="https://softwaredesign.ing/" isExternal color="blue.500">
        Created with ❤️ by{' '}
          PG
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;