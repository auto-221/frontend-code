import {
  Flex,
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  HStack,
  Link,
  Button,
  Heading,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import {FaFacebook, FaGoogle} from 'react-icons/fa';
import {useState} from 'react';
import Base from '../components/layout/Base';

export default function login() {

  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setCredentials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const login =  async event =>  {
    event.preventDefault()
   
    const res = await fetch('http://localhost:1337/auth/local', {
    
        body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })
  
    const data = await res.json()
    console.log(data)
    if (data) {
      localStorage.setItem('token', data.jwt)
    }
  }

  return (
    <Base>
      <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} minW={'md'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
        <form onSubmit={login}>
            <Flex justify={'center'} mt={4}>
              <Avatar
                size={'xl'}
                src={
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
                }
                alt={'Author'}
                css={{
                  border: '2px solid white',
                }}
              />
            </Flex>
            <Stack align={'center'}>
              <Heading as="h4" size="xs" fontSize={'xl'} mt={4}>Connectez vous à Votre Compte</Heading>
              <Text fontSize={'lg'} color={'gray.600'}>
                Entrez vos informations 
              </Text>
            </Stack>
          
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Identifiant' type="text" onChange={handleChange}  name='identifier' />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Mot de Passe</FormLabel>
                <Input  placeholder='Mot de passe' type="text" onChange={handleChange} type="password" name='password' />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Link color={'blue'}>Mot de passe oublié?</Link>
                </Stack>
                <Button
                type='submit'
                  bg={'blue.500'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.500',
                  }}>
                  Connexion
                </Button>
              </Stack>
              <Flex justifyContent={'space-around'}>
                <Divider orientation="horizontal" width={'20%'} mt={2}/>
                <Text as="h6" fontSize={12} color={'gray.600'}>
                Connectez vous avec 
                </Text>
                <Divider orientation="horizontal" width={'20%'} mt={2}/>
              </Flex>
              <Flex justifyContent={'center'}>
                <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                Se connecter avec Facebook
                </Button>
              </Flex>
              <Flex justifyContent={'center'}>
                <Button colorScheme="red" leftIcon={<FaGoogle />}>
                  Se connecter avec Google
                </Button>
              </Flex>
              <Flex justifyContent={'space-around'}>
                <Divider orientation="horizontal" width={'20%'} mt={2}/>
                <Text as="h6" fontSize={12} color={'gray.600'}>
                Pas encore de compte ?
                </Text>
                <Divider orientation="horizontal" width={'20%'} mt={2}/>
              </Flex>
              <Button
                type='submit'
                  bg={'gray.500'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.500',
                  }}>
                  S'inscrire
                </Button>
            </Stack>
            </form>
        </Box>
      </Stack>
    </Flex>

    </Base>
  );
}