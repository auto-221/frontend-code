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
  Divider,
  RadioGroup,
  Radio,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import Base from '../components/layout/Base';
import {useState} from 'react'
// import { register } from './api/register'



export default function RegisterUser() {


  const [value, setValue] = useState("1")

  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    password: "",
    //confirm: "",
    tel: "",
    adresse: "",
    nom:"",
    description:"",
    adresseparking:"",
  });

  const parking = {
    nom:userInfos.nom,
    description: userInfos.description,
    adresseparking: userInfos.adresseparking,
    user: ''
  }


  const handleChange = ({ target: { name, value } }) => {
    setUserInfos(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const register =  async event =>  {
    event.preventDefault()
   
    const res = await fetch('http://localhost:1337/auth/local/register', {
    
        body: JSON.stringify(userInfos),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })
  
    const result = await res.json()
    parking.user = result.user.id;
    if (result  != null ){
      const parkingRequest = await fetch('http://localhost:1337/parkings', {
    
        body: JSON.stringify(parking),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })
    }
    console.log(parkingRequest)
  }

  function validateField(value) {
    let error
    if (!value) {
      error = "Veuillez remplir ce champ"
    }
    return error
  }
  


  return (
    <Base>
        <form onSubmit={register}> 
          <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} mr={200} ml={200}
           bg={useColorModeValue('gray.50', 'gray.1800')}>
          <Flex  p={10} flex={1}  justify={'center'}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}><PhoneIcon mr='4' h={5} color='red.400' />Sign in to your account</Heading>
              <Divider orientation="horizontal" mb={4}/>
                  <FormControl  direction='row' isRequired>
                    <Stack>
                      <FormLabel>Nom Complet</FormLabel>
                      <Input placeholder='Nom Complet'onChange={handleChange}  name='username'type="text" size='sm' />
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack >
                      <FormLabel>Email</FormLabel>
                      <Input placeholder='Email' onChange={handleChange} type="email"  name='email' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack>
                      <FormLabel>Mot de passe</FormLabel>
                      <Input placeholder='Mot de passe'onChange={handleChange} type="password" name='password' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row'>
                    <Stack>
                      <FormLabel>Mot de passe</FormLabel>
                      <Input placeholder='Confirmez le mot de passe' type="confirmPassword" name='confirmPassword' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack>
                      <FormLabel>Telephone</FormLabel>
                      <Input placeholder='Numero de telephone' onChange={handleChange}  type="number"  name='tel' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack>
                      <FormLabel>Adresse</FormLabel>
                      <Input placeholder='Adresse' onChange={handleChange} type="text" name='adresse'  size='sm'/>
                    </Stack>
                  </FormControl>
            </Stack>
          </Flex>
          <Flex p={10} flex={1}  justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}><AddIcon mr='4' h={5} color='red.400'/>Informations supplémentaires</Heading>
              <Divider orientation="horizontal" mb={4}/>
                  <FormControl id="nom" direction='row'>
                    <Stack>
                      <FormLabel>Nom Complet</FormLabel>
                      <RadioGroup onChange={setValue} value={value} >
                        <Stack direction="row">
                          <Radio value="1">Oui</Radio>
                          <Radio value="0">Non</Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  </FormControl>
                  <FormControl id="nomParking" direction='row' mt={2}>
                      <Stack>
                        <FormLabel>Nom du parking</FormLabel>
                        <Input placeholder='Nom du parking' onChange={handleChange}  name='nom' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <FormControl id="lieu" direction='row'>
                      <Stack>
                        <FormLabel>Ou se trouve t-il</FormLabel>
                        <Input placeholder='adresse du parking' onChange={handleChange}  name='adresseparking' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <FormControl id="description" direction='row'>
                      <Stack>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder='Description de votre parking parking' onChange={handleChange}  name='description' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <Button
                    display={{ base: 'none', md: 'inline-flex' }}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'orange.400'}
                    //href={''}
                    _hover={{
                      bg: 'black'
                    }} type="submit"
                  >
                    Register
                  </Button>
            </Stack>
          
          </Flex>
        </Stack>
       
        </form>
    </Base>
  );
}
