import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
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
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
        <Heading fontSize={'2xl'}>Se Connecter à Votre Compte</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            espaces utilisateurs <Link color={'orange'}></Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
            <form onSubmit={login}>
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
                  <Link color={'orange'}>Mot de passe oublié?</Link>
                </Stack>
                <Button
                type='submit'
                  bg={'orange'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Connexion
                </Button>
              </Stack>
            </Stack>
            </form>
        </Box>
      </Stack>
    </Flex>
 
    </Base>
  );
}