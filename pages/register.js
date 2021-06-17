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
   
    const res = await fetch('http://localhost:1334/auth/local/register', {
    
        body: JSON.stringify(userInfos),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })
  
    const result = await res.json()
    parking.user = result.user.id;
    if (result  != null ){
      const parkingRequest = await fetch('http://localhost:1334/parkings', {
    
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
        <form onSubmit={register} > 
          <Stack minH={'70vh'}  direction={{ base: 'column', md: 'row' }}  mt={8} mb={4}
           bg={useColorModeValue('gray.50', 'gray.1800')}
           boxShadow="2xl" p="2" rounded="md" bg="white"
           >
          <Flex  p={10} flex={1}  justify={'center'}>
            <Stack spacing={1} w={'full'} maxW={'md'}>
            <Heading  as="h3" size="xs" ><PhoneIcon mr='4' h={5} color='red.400' />Inscrivez vous et commencez à publier vos annonces</Heading>
              <Divider orientation="horizontal" mb={4}/>
              <Heading  as="h3" size="xs" ><PhoneIcon mr='4' h={5} color='red.400' />Informations personnelles</Heading>
              <Divider orientation="horizontal" mb={4}/>
                  <FormControl  isRequired>
                    <Stack direction='row'  mb={4} mt={4}>
                      <FormLabel flex={1}>Nom Complet</FormLabel>
                      <Input flex={1} placeholder='Nom Complet'onChange={handleChange}  name='username'type="text" size='sm' />
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Email</FormLabel>
                      <Input flex={1}placeholder='Email' onChange={handleChange} type="email"  name='email' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Mot de passe</FormLabel>
                      <Input flex={1} placeholder='Mot de passe'onChange={handleChange} type="password" name='password' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row'>
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1} >Mot de passe</FormLabel>
                      <Input  flex={1} placeholder='Confirmez le mot de passe' type="confirmPassword" name='confirmPassword' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Telephone</FormLabel>
                      <Input flex={1} placeholder='Numero de telephone' onChange={handleChange}  type="number"  name='tel' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl  direction='row' isRequired>
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Adresse</FormLabel>
                      <Input flex={1}placeholder='Adresse' onChange={handleChange} type="text" name='adresse'  size='sm'/>
                    </Stack>
                  </FormControl>
                  <Button
                     display={{ base: 'none', md: 'inline-flex' }}
                     fontSize={'sm'}
                     width={100}
                     justifyContent={'center'}
                     fontWeight={600}
                     color={'white'}
                     bg={'#ff7143'}

                    
                    //href={''}
                    _hover={{
                      bg: 'black'
                    }} type="submit"
                  >
                    Inscription
                  </Button>
            </Stack>
          </Flex>
          <Flex p={10} flex={1}  justify={'center'}>
          <Stack spacing={1} w={'full'} maxW={'md'}>
          <Heading as="h3" size="xs" mt={8}><AddIcon mr='4' h={5} color='red.400'/>Informations supplémentaires</Heading>
              <Divider orientation="horizontal" mb={4}/>
                  <FormControl id="nom" >
                    <Stack mt={4} mb={4}>
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
                      <Stack  direction='row' mb={4}>
                        <FormLabel flex={1}>Nom du parking</FormLabel>
                        <Input flex={1} placeholder='Nom du parking' onChange={handleChange}  name='nom' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <FormControl id="lieu" direction='row'>
                      <Stack direction='row' mb={4}>
                        <FormLabel flex={1}>Ou se trouve t-il</FormLabel>
                        <Input flex={1} placeholder='adresse du parking' onChange={handleChange}  name='adresseparking' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <FormControl id="description" direction='row'>
                      <Stack direction='row' mb={4}>
                        <FormLabel flex={1}>Description</FormLabel>
                        <Input flex={1} placeholder='Description de votre parking parking' onChange={handleChange}  name='description' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
            </Stack>
          </Flex>
        </Stack>
      </form>
    </Base>
  );
}
