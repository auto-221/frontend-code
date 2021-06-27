import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
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
import {useState, useEffect} from 'react'
import React from 'react';
// npm i react-hook-form
import { useForm } from 'react-hook-form';
// npm i @hhokform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// npm i yup
import * as yup from "yup";

export default function RegisterUser() {

  // Definition des inputs validation
  const schema = yup.object().shape({
    username: yup.string().required('Identifiant obligatoire'),
    email: yup.string()
      .required('Email obligatoire')
      .email('Email invalide'),
    password: yup.string()
      .min(6, 'Mot de passe doit comprendre au moins 6 caracteres')
      .required('Mot de passe obligatoire'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'doit correspondre au mot de passe')
      .required('Champ obligatoire'),   
    tel: yup.string() 
      .required('Tel obligatoire') ,
    adresse: yup.string().required('Adresse obligatoire'),  
  });
  // initialisation des validations au niveau du form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

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
    role:''
    // role: {
    //   id: 3
    // }
  });

  // const parking = {
  //   nom:userInfos.nom,
  //   description: userInfos.description,
  //   adresseparking: userInfos.adresseparking,
  //   user: ''
  // }

  const parking = {
    nom: '',
    description: '',
    adresseparking: '',
    user: ''
  }


  // const handleChange = ({ target: { name, value } }) => {
  //   setUserInfos(prev => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   // console.log('ndigger'+ test)
  // };

  // const onSubmit = async data =>

  const saveUser =  async user =>  {
    //event.preventDefault()
   
    const res = await fetch('http://localhost:1337/auth/local/register', {
    
        body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
    })
  
    const result = await res.json()

    if (user.role == 1 && result  != null ) {
      parking.user = result.user.id;
      parking.nom = user.nom;
      parking.description = user.description;
      parking.adresseparking = user.adresseparking;
      const parkingRequest = await fetch('http://localhost:1337/parkings', {
      
        body: JSON.stringify(parking),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
      })
    }
    // console.log(parkingRequest)
  }

  return (
    <Base>
        <form onSubmit={handleSubmit(saveUser)}> 
          <Stack minH={'70vh'}  direction={{ base: 'column', md: 'row' }}  mt={8} mb={4}
           bg={useColorModeValue('gray.50', 'gray.1800')}
           _hover={{
            boxShadow:"2xl", p:"2", rounded:"md"
            }}
            bg="white"
           >
          <Flex  p={10} flex={1}  justify={'center'}>
            <Stack spacing={1} w={'full'} maxW={'md'}>
            <Heading  as="h3" size="xs" ><PhoneIcon mr='4' h={5} color='red.400' />Inscrivez vous et commencez à publier vos annonces</Heading>
              <Divider orientation="horizontal" mb={4}/>
              <Heading  as="h3" size="xs" ><PhoneIcon mr='4' h={5} color='red.400' />Informations personnelles</Heading>
              <Divider orientation="horizontal" mb={4}/>
                  <FormControl  >
                    <Stack direction='row'  mb={4} mt={4}>
                      <FormLabel flex={1}>Nom Complet</FormLabel>
                      <Input flex={1} placeholder='Nom Complet' name='username' {...register("username")} type="text"  />
                    </Stack>
                    <Text color={'red'}>{errors.username?.message}</Text>
                  </FormControl>
                  <FormControl  direction='row' >
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Email</FormLabel>
                      <Input flex={1}placeholder='Email'  type="email"  name='email' {...register("email")} />
                    </Stack>
                    <Text color={'red'}>{errors.email?.message}</Text>
                  </FormControl>
                  <FormControl  direction='row' >
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Mot de passe</FormLabel>
                      <Input flex={1} placeholder='Mot de passe' type="password" name='password' {...register("password")} />
                    </Stack>
                    <Text color={'red'}>{errors.password?.message}</Text>
                  </FormControl>
                  <FormControl  direction='row'>
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1} >Mot de passe de confirmation</FormLabel>
                      <Input  flex={1} placeholder='Confirmez le mot de passe' type="password" name='confirmPassword' {...register("confirmPassword")} />
                    </Stack>
                    <Text color={'red'}>{errors.confirmPassword?.message}</Text>
                  </FormControl>
                  <FormControl  direction='row' >
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Telephone</FormLabel>
                      <Input flex={1} placeholder='Numero de telephone'   type="number"  name='tel' {...register("tel")} />
                    </Stack>
                    <Text color={'red'}>{errors.tel?.message}</Text>
                  </FormControl>
                  <FormControl  direction='row' >
                    <Stack direction='row' mb={4} >
                      <FormLabel flex={1}>Adresse</FormLabel>
                      <Input flex={1}placeholder='Adresse'  type="text" name='adresse' {...register("adresse")} />
                    </Stack>
                    <Text color={'red'}>{errors.adresse?.message}</Text>
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
                      <FormLabel>Disposez vous d'un parking</FormLabel>
                      <RadioGroup onChange={setValue} name='role' value={value} >
                        <Stack direction="row">
                          <Radio value="1" {...register("role")}>Oui</Radio>
                          <Radio value="0" {...register("role")}>Non</Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  </FormControl>
                  <FormControl id="nomParking" direction='row' mt={2}>
                      <Stack  direction='row' mb={4}>
                        <FormLabel flex={1}>Nom du parking</FormLabel>
                        <Input flex={1} placeholder='Nom du parking'   name='nom'  {...register("nom")} type="text" />
                      </Stack>
                  </FormControl>
                  <FormControl id="lieu" direction='row'>
                      <Stack direction='row' mb={4}>
                        <FormLabel flex={1}>Ou se trouve t-il</FormLabel>
                        <Input flex={1} placeholder='adresse du parking'   name='adresseparking' {...register("adresseparking")} type="text" />
                      </Stack>
                  </FormControl>
                  <FormControl id="description" direction='row'>
                      <Stack direction='row' mb={4}>
                        <FormLabel flex={1}>Description</FormLabel>
                        <Input flex={1} placeholder='Description de votre parking parking'   name='description' {...register("description")} type="text" />
                      </Stack>
                  </FormControl>
            </Stack>
          </Flex>
        </Stack>
      </form>
    </Base>
  );
}
