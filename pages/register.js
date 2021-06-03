import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
  } from '@chakra-ui/react';
  
  export default function Register() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Création Compte</Heading>
            <FormControl id="firstname">
              <FormLabel>Prénom</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="lastname">
              <FormLabel>Nom</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="tel">
              <FormLabel>Téléphone </FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="adresse">
              <FormLabel>Adresse</FormLabel>
              <Input type="text" />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
            
              </Stack>
              <Button colorScheme={'orange'} variant={'solid'}>
                 Valider
              </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              '/car.jpg'
            }
          />
        </Flex>
      </Stack>
    );
  }