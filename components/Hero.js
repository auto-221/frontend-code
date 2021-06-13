import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Flex
    w={'full'}
    h={'30vh'}
    mt={4}
      backgroundImage={
        '/h.jpeg'
      }
      backgroundSize={'cover'}
      backgroundPosition={'center center'}>
      <VStack
        w={'full'}
        alignItems={'flex-start'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
        <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}>
            La voiture de vos rêves <br />
            est à quelques clics.
          </Text>
          <Stack direction={'row'}>
            <Button bg={'orange.400'} rounded={'full'} color={'white'} _hover={{ bg: 'blue.500' }}>
              Découvrir les annonces
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
