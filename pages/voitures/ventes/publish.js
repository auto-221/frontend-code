/* eslint-disable react/prop-types */
import {
  Label,
  Icon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Stack,
  Divider,
  Textarea,
  Select,
  Box,
  Image,
  SimpleGrid,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { PhoneIcon, AddIcon } from '@chakra-ui/icons';
import Base from '../../../components/layout/Base';
// import {useState} from 'react'
import React from 'react';
// npm i react-hook-form
import { useForm } from 'react-hook-form';
// npm i @hhokform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// npm i yup
import * as yup from 'yup';
import Router from 'next/router';

const annonce = {
  description: '',
  prix: '',
  date: '',
  etat: 0,
  voiture: '',
  type: ''
};

let files = [];
let fileArray = [];

async function loadModeles() {
  let marque = document.getElementById('marque');
  let modele = document.getElementById('modele');
  const res = await fetch('http://localhost:1337/marques/' + marque.value);
  let data = await res.json();
  let modeles = [];
  modeles = data.modeles;
  for (var variable in modeles) {
    modele.innerHTML =
      "<option value='" + modeles[variable].id + "'>" + modeles[variable].libelle + '</option>';
  }
  console.log(modele);
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:1337/marques');
  let marques = await res.json();
  console.log(marques);

  return {
    props: {
      marques
    }
  };
}

export default function Publish({ marques }) {
  const [filesUri, setFileUri] = useState([]);
  const toast = useToast();

  function getFiles(event) {
    files = event.target.files;
    let showFiles = document.getElementById('showFile');
    for (let i = 0; i < files.length; i++) {
      filesUri.push(URL.createObjectURL(files[i]));
      fileArray.push(URL.createObjectURL(files[i]));
    }
    console.log(fileArray);
    setFileUri(filesUri);
    for (let i = 0; i < filesUri.length; i++) {
      showFiles.innerHTML += "<Image src={url} roundedTop='lg' />";
    }
    // setImages(files)
  }

  const saveAnnonceVente = async (vente) => {
    const voiture = {};
    const parking = localStorage.getItem('parkingInfo');
    voiture.annee = vente.annee;
    voiture.carburant = vente.carburant;
    // voiture.kilometrage = kilometrage;
    voiture.transmission = vente.transmission;
    voiture.places = 4;
    voiture.modele = vente.modele;
    voiture.type = vente.type;
    voiture.parking = {
      id: parking
    };
    const fileName = 'photo1';
    annonce.prix = vente.prix;
    annonce.date = new Date();
    annonce.type = vente.type;
    annonce.description = vente.description;
    let formData = new FormData();
    // formData.append('photo1', files[0]);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append(`files.${fileName}`, file, file.name);
    }
    formData.append('data', JSON.stringify(voiture));

    console.log(formData);
    const res = await fetch('http://localhost:1337/voitures', {
      body: formData,

      method: 'POST'
    });

    const result = await res.json();

    if (result.id) {
      annonce.voiture = result.id;
      const annonceRequest = await fetch('http://localhost:1337/annonces', {
        body: JSON.stringify(annonce),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });
      const annonceResult = await annonceRequest.json();

      if (annonceResult) {
        alertSuccess();
        Router.push('/voitures/ventes/publish');
      }
    }
  };

  const alertSuccess = () => {
    toast({
      title: 'Annonce crée.',
      description: 'Elle sera vérifiiée par notre équipe pour validation. Merci',
      status: 'success',
      duration: 9000,
      isClosable: true
    });
  };
  // Definition des inputs validation
  const schema = yup.object().shape({
    marque: yup.string().required('Veuillez choisir une marque'),
    modele: yup.string().required('Veuillez choisir un modele'),
    prix: yup
      .string()
      .matches(/^[0-9]+$/, 'Invalide')
      .required('Prix obligatoire')
      .min(6, 'Revoyez le prix de la voiture'),
    places: yup.string().max(3, 'Invalide'),
    annee: yup
      .string()
      .matches(/^[0-9]+$/, 'Invalide')
      .max(4, 'Invalide')
  });
  // initialisation des validations au niveau du form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <Base>
      <form onSubmit={handleSubmit(saveAnnonceVente)} justifycontent="center">
        <Stack
          mr={'10%'}
          ml={'10%'}
          mt={8}
          mb={4}
          border={'1px solid #dfdfdf'}
          rounded="md"
          p="2"
          _hover={{
            boxShadow: '2xl',
            p: '2',
            rounded: 'md'
          }}
          bg="white">
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Flex p={5} flex={1} justify={'center'} w={{ base: '100%', md: '50%' }}>
              <Stack spacing={1} w="100%">
                <Heading as="h3" size="xs">
                  <PhoneIcon mr="4" h={5} color="red.400" />
                  Inscrivez vous et commencez à publier vos annonces
                </Heading>
                <Divider orientation="horizontal" mb={4} />
                <Heading as="h3" size="xs">
                  <PhoneIcon mr="4" h={5} color="red.400" />
                  Informations personnelles
                </Heading>
                <Divider orientation="horizontal" mb={4} />
                <FormControl>
                  <Stack direction="row" mb={4} mt={4}>
                    <FormLabel flex={1}>Marque</FormLabel>
                    <Select
                      w={'66%'}
                      id="marque"
                      name="marque"
                      {...register('marque')}
                      rounded={'5'}
                      onChange={loadModeles}>
                      {marques.map((marque) => (
                        <option key={marque.id} value={marque.id}>
                          {marque.libelle}
                        </option>
                      ))}
                    </Select>
                  </Stack>
                  <Text color={'red'}>{errors.marque?.message}</Text>
                </FormControl>
                <FormControl direction="row">
                  <Stack direction="row" mb={4} mt={4}>
                    <FormLabel flex={1}>Modèle</FormLabel>
                    <Select
                      w={{ base: '100%', md: '66%' }}
                      id="modele"
                      name="modele"
                      rounded={'5'}
                      {...register('modele')}></Select>
                  </Stack>
                  <Text color={'red'}>{errors.modele?.message}</Text>
                </FormControl>
                <FormControl direction="row">
                  <Stack direction="row" mb={4}>
                    <FormLabel flex={1}>Prix</FormLabel>
                    <Input
                      flex={2}
                      placeholder="Prix"
                      type="text"
                      name="prix"
                      {...register('prix')}
                    />
                  </Stack>
                  <Text color={'red'} fontSize="sm">
                    {errors.prix?.message}
                  </Text>
                </FormControl>
                <FormControl direction="row">
                  <Stack direction="row" mb={4}>
                    <FormLabel flex={1}>Description</FormLabel>
                    <Textarea
                      flex={2}
                      placeholder="Parlez nous de votre voiture"
                      type="text"
                      name="description"
                      {...register('description')}
                    />
                  </Stack>
                  <Text color={'red'}>{errors.description?.message}</Text>
                </FormControl>
              </Stack>
            </Flex>
            <Flex p={5} flex={1} justify={'center'} w={{ base: '100%', md: '50%' }}>
              <Stack spacing={1} w="100%">
                <Heading as="h3" size="xs" mt={8}>
                  <AddIcon mr="4" h={5} color="red.400" />
                  Informations supplémentaires
                </Heading>
                <Divider orientation="horizontal" mb={4} />
                <FormControl>
                  <Stack direction="row" mb={4} mt={4}>
                    <FormLabel flex={1}>Transmission</FormLabel>
                    <Select
                      w={'66%'}
                      name="transmission"
                      {...register('transmission')}
                      rounded={'5'}>
                      <option value="">Transmission...</option>
                      <option value="Manuelle">Manuelle</option>
                      <option value="Semi-Automatique">Semi-Automatique</option>
                      <option value="Automatique">Automatique</option>
                    </Select>
                  </Stack>
                </FormControl>
                <FormControl direction="row">
                  <Stack direction="row" mb={4}>
                    <FormLabel flex={1}>Nombre de places</FormLabel>
                    <Input
                      flex={2}
                      placeholder="Nombre de places"
                      name="places"
                      {...register('places')}
                      type="text"
                    />
                  </Stack>
                  <Text color={'red'}>{errors.places?.message}</Text>
                </FormControl>
                <FormControl>
                  <Stack direction="row" mb={4}>
                    <FormLabel flex={1}>Type</FormLabel>
                    <Select w={'66%'} name="type" {...register('type')} rounded={'5'}>
                      <option value="">Type...</option>
                      <option value="Neuve">Neuve</option>
                      <option value="Occassion">Occassion</option>
                    </Select>
                  </Stack>
                  <Text color={'red'}>{errors.type?.message}</Text>
                </FormControl>
                <FormControl>
                  <Stack direction="row" mb={4}>
                    <FormLabel flex={1}>Carburant</FormLabel>
                    <Select w={'66%'} name="carburant" {...register('carburant')} rounded={'5'}>
                      <option value="">Carburant...</option>
                      <option value="Electrique">Electrique</option>
                      <option value="Essence">Essence</option>
                      <option value="Diesel">Diesel</option>
                      <option value="Hybride">Hybride</option>
                    </Select>
                  </Stack>
                  <Text color={'red'}>{errors.carburant?.message}</Text>
                </FormControl>
                <FormControl id="description" direction="row">
                  <Stack direction="row" mb={4}>
                    <FormLabel flex={1}>Annee</FormLabel>
                    <Input
                      flex={2}
                      placeholder="Annee de la voiture"
                      name="annee"
                      {...register('annee')}
                      type="text"
                    />
                  </Stack>
                  <Text color={'red'}>{errors.annee?.message}</Text>
                </FormControl>
              </Stack>
            </Flex>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }} mt={'-80px'}>
            {/* file select section*/}
            
            <Flex p={5} flex={1} direction={'column'} w={{ base: '100%', lg: '100%' }}>
              {(() => {
                if (filesUri.length > 0) {
                  return (
                    <><SimpleGrid columns={{ base: '1', md: '4' }} id='showFile' >
                      {/* {filesUri.map((url, i) => (
                        
                      ))} */}
                    </SimpleGrid><Stack w={'100%'} border={'1px solid black'} h={'180px'} direction={'row'}>
                        {filesUri.map((url, i) => (
                          <Box
                            key={i}
                            w={'100px'}
                            h={'200px'}
                            borderWidth="1px"
                            rounded="lg"
                            shadow="lg"
                            position="relative">
                            <Image src={url} roundedTop="lg" />
                          </Box>
                        ))}
                      </Stack></>
                  );
                }
              })()}
              <Stack spacing={1} w="100%">
                <Heading as="h3" size="xs" mt={8}>
                  <Icon as={FaImage} fontSize={20} mr="4" h={5} color="red.400" />
                  <AddIcon mr="4" h={5} color="red.400" />
                  Photos
                </Heading>
                <Divider orientation="horizontal" mb={4} />
                <FormControl border={'2px dashed #e2e8f0 '} 
                position={'relative'}
                user-select={'none'} 
                display={{ base: 'flex', md: 'flex' }}
                justifyContent={{ base: 'center', md: 'center' }}
                alignItems={{ base: 'center', md: 'center' }}

                >
                  <Stack direction="row" mb={4} mt={4}>
                    <label For='images' style={{cursor : 'pointer'}} >Veuillez selectionner vos images</label>
                    <Input display={'none'} type="file" id="images" name="images[]" multiple onChange={getFiles} />
                  </Stack>
                </FormControl>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  width={100}
                  justifycontent={'center'}
                  fontWeight={600}
                  color={'white'}
                  bg={'#ff7143'}
                  _hover={{
                    bg: 'black'
                  }}
                  type="submit">
                  Inscription
                </Button>
              </Stack>
            </Flex>
          </Stack>
        </Stack>
      </form>
    </Base>
  );
}
