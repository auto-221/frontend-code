import { Box, Container, Stack, Text, Link, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('#ff7143', '#ff7143')}
      color={useColorModeValue('white', 'white')}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Stack direction={'row'} spacing={6}>
          <Link href={'#'}>AUTO 221</Link>
         
        </Stack>
        <Text>© 2021 Auto 221. All rights reserved</Text>
      </Container>
    </Box>
  );
}
