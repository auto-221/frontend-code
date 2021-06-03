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
} from '@chakra-ui/react';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import Base from '../components/layout/Base';
// import { register } from './api/register'

const register =  async event =>  {
  event.preventDefault()
  console.log(event.target.value.email)
  const formData = new FormData()
  // formData.append(nom, event.target.value.nom)
  formData.append(name, event.target.value.email)
  formData.append(password, event.target.value.password)
  formData.append(adresse, event.target.value.adresse)
  formData.append(email, event.target.value.email)

  const res = await fetch('http://localhost:1337/users/create', {
  
      body: JSON.stringify({
          formData
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
  })

  const result = await res.json()
}

export default function RegisterUser() {
  return (
    <Base>
        <form onSubmit={register}> 
          <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'} m={20}>
            <Stack spacing={4} w={'full'} maxW={'md'}>
              <Heading fontSize={'2xl'}><PhoneIcon mr='4' h={5} color='red.400' />Sign in to your account</Heading>
              <Divider orientation="horizontal" mb={4}/>
                  <FormControl id="nom"name='nom' direction='row'>
                    <Stack>
                      <FormLabel>Nom Complet</FormLabel>
                      <Input placeholder='Nom Complet' name='nom' type="text" size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl id="email" name='email' direction='row'>
                    <Stack>
                      <FormLabel>Email</FormLabel>
                      <Input placeholder='Email' type="email" name='email' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl id="password" direction='row'>
                    <Stack>
                      <FormLabel>Mot de passe</FormLabel>
                      <Input placeholder='Mot de passe' type="password" name='password' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl id="confirm" direction='row'>
                    <Stack>
                      <FormLabel>Mot de passe</FormLabel>
                      <Input placeholder='Confirmez le mot de passe' type="confirm" name='confirm' size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl id="tel" direction='row'>
                    <Stack>
                      <FormLabel>Telephone</FormLabel>
                      <Input placeholder='Numero de telephone' type="number" name='tel'size='sm'/>
                    </Stack>
                  </FormControl>
                  <FormControl id="adresse" direction='row'>
                    <Stack>
                      <FormLabel>Adresse</FormLabel>
                      <Input placeholder='Adresse' type="text" name='adresse' size='sm'/>
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
                      <RadioGroup >
                        <Stack direction="row">
                          <Radio value="oui">Oui</Radio>
                          <Radio value="non">Non</Radio>
                        </Stack>
                      </RadioGroup>
                    </Stack>
                  </FormControl>
                  <FormControl id="nomParking" direction='row' mt={2}>
                      <Stack>
                        <FormLabel>Nom du parking</FormLabel>
                        <Input placeholder='Nom du parking' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <FormControl id="lieu" direction='row'>
                      <Stack>
                        <FormLabel>Ou se trouve t-il</FormLabel>
                        <Input placeholder='adresse du parking' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <FormControl id="description" direction='row'>
                      <Stack>
                        <FormLabel>Description</FormLabel>
                        <Input placeholder='Description de votre parking parking' type="text" size='sm'/>
                      </Stack>
                  </FormControl>
                  <Button type="submit">Register</Button>
            </Stack>
          
          </Flex>
        </Stack>
       
        </form>
    </Base>
  );
}
