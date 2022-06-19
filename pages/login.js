import {
  Flex,
  Avatar,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  Divider,
  useColorModeValue,
  Spinner
} from '@chakra-ui/react';
import {FaFacebook, FaGoogle} from 'react-icons/fa';
import Base from '../components/layout/Base';
import React from 'react';
// npm i react-hook-form
import { useForm } from 'react-hook-form';
// npm i @hhokform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// npm i yup
import * as yup from "yup";
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { setCookies, checkCookies } from 'cookies-next';

export default function Login() {

  useEffect(() => {
    document.getElementById('spinner').style.display = 'none';
  });

  // Definition des inputs validation
  const schema = yup.object().shape({
    identifier: yup.string().required('Identifiant obligatoire'),
    password: yup.string()
      .min(6, 'Mot de passe court')
      .required('Mot de passe obligatoire'),
  });
  
  // initialisation des validations au niveau du form
   const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const router = useRouter()

  // const onSubmit = (data) => { console.log(data)}

  // const router = useRouter()
  // const [credentials, setCredentials] = useState({
  //   identifier: "",
  //   password: "",
  // });

  // const handleChange = ({ target: { name, value } }) => {
  //   setCredentials(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  async function login(infos) {
    // event.preventDefault()
    document.getElementById('spinner').style.display = 'inherit';
    const res = await fetch('http://localhost:1337/auth/local', {
    
        body: JSON.stringify(infos),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })
  
    const data = await res.json()
    if (data) {
      document.getElementById('spinner').style.display = 'none';
      let options = {
        sameSite: 'none',
        secure: true
      }
      localStorage.setItem('token', data.jwt)
      localStorage.setItem('user', data.user)
      localStorage.setItem('parkingInfo', data.user.parking.id)
      setCookies('parking', data.user.parking.id, options);
      // eslint-disable-next-line no-undef
      // setCookies('key', data, { req, res }); 
      checkCookies('user') 
      router.push('/')
    }
  }

  return (
    <Base>
      <Flex h={'40%'} align={{ base: 'center', md: 'center' }} justify={{ base: 'center', md: 'center' }}>
        <Stack >
          <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'lg'} p={8}>
            <form onSubmit={handleSubmit(login)}>
              <Flex justify={'center'} mt={4}>
                <Avatar
                  boxShadow={'lg'}
                  size={'xl'}
                  src={''}
                  alt={'Author'}
                  css={{
                    border: '2px solid white'
                  }}
                />
              </Flex>
              <Stack align={'center'}>
                <Heading as="h4" size="xs" fontSize={'xl'} mt={4}>
                  Connectez vous à Votre Compte
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  Entrez vos informations
                </Text>
              </Stack>

              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Identifiant"
                    type="text"
                    name="identifier"
                    {...register('identifier')}
                  />
                  <Text color={'red'}>{errors.identifier?.message}</Text>
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Mot de Passe</FormLabel>
                  <Input
                    placeholder="Mot de passe"
                    type="password"
                    name="password"
                    {...register('password')}
                  />
                  <Text color={'red'}>{errors.password?.message}</Text>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Link color={'blue'}>Mot de passe oublié?</Link>
                  </Stack>
                  <Button
                    type="submit"
                    bg={'#ff7143'}
                    color={'white'}
                    _hover={{
                      bg: 'orange.500'
                    }}>
                    Connexion
                  </Button>
                  <Spinner id='spinner'
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Stack>
                <Flex justifyContent={'space-around'}>
                  <Divider orientation="horizontal" width={'20%'} mt={2} />
                  <Text as="h6" fontSize={12} color={'gray.600'}>
                    Connectez vous avec
                  </Text>
                  <Divider orientation="horizontal" width={'20%'} mt={2} />
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
                  <Divider orientation="horizontal" width={'20%'} mt={2} />
                  <Text as="h6" fontSize={12} color={'gray.600'}>
                    Pas encore de compte ?
                  </Text>
                  <Divider orientation="horizontal" width={'20%'} mt={2} />
                </Flex>
                <Button
                  type="submit"
                  bg={'#ff7143'}
                  color={'white'}
                  _hover={{
                    bg: 'orange.500'
                  }}>
                  S {"'"} inscrire
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Base>
  );
}