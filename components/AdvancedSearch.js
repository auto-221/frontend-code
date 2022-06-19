/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-duplicate-props */
import {
  Button,
  Text,
  Input,
  Box,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import {
  FaCar,
  FaWrench,
  FaCalendar,
  FaFire,
  FaWaveSquare,
  FaRoad,
  FaMoneyBill
} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
// npm i @hhokform/resolvers
import { yupResolver } from '@hookform/resolvers/yup';
// npm i yup
import * as yup from 'yup';
import Router from 'next/router';
//import { FaCar } from "react-icons/md"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

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


export default function AdvancedrSearch() {

  const [marques, setMarques] = useState([])

  let [filtered, setAnnonces] = useState([])

  const fetchMarques = async () => {
    const res =  await fetch('http://localhost:1337/marques');
    const marques = await res.json()
    setMarques(marques);
  }

  useEffect( () => {
    fetchMarques();
    }, [setMarques]);

    const router = useRouter()

  // Definition des inputs validation
  const schema = yup.object().shape({
    prix: yup
      .string()
      .matches(/^[0-9]+$/, 'Invalide')
      .min(6, 'Revoyez le prix de la voiture'),
    places: yup.string().max(3, 'Invalide'),
    // annee: yup
    //   .string()
    //   .matches(/^[0-9]+$/, 'Invalide')
    //   .max(0, 'Invalide')
  });
  // initialisation des validations au niveau du form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });


  const search = async (search) => {
    let resultsCopy = [];
    let matches = []
    const res = await fetch('http://localhost:1337/annonces?type=vente');
    // const res = await fetch('http://localhost:1337/annonces?_start='+ start +'&_limit='+ limit +'&type=vente')
    const data = await res.json();
    setAnnonces(data)
    //resultsCopy = data
    matches = data
    if ( search.marque != 0 ) {
      matches = matches.filter(
        (annonce) => annonce.voiture.marque == search.marque
      );
      filtered = matches
    }

    if ( search.modele != 0 ) {
      matches = matches.filter(
        (annonce) => annonce.voiture.modele == search.modele
      );
      filtered = matches
    }

    if ( search.annee ) {
      matches = matches.filter(
        (annonce) => annonce.voiture.annee == search.annee
      );
      filtered = matches
    }

    if ( search.carburant != 0 ) {
      matches = matches.filter(
        (annonce) => annonce.voiture.carburant == search.carburant
      );
      filtered = matches
    }

    if ( search.transmission != 0 ) {
      matches = matches.filter(
        (annonce) => annonce.voiture.transmission == search.transmission
      );
      filtered = matches
    }

    if ( search.etat != 0 ) {
      matches = matches.filter(
        (annonce) => annonce.voiture.etat == search.etat
      );
      filtered = matches
    }
    console.log(filtered.length);

    if (filtered.length == 0) {
      alert('oups');
    } else {
      // alert('youpi');
      localStorage.setItem('thiakhagoune', JSON.stringify(filtered))
      router.push('/annonces/result')
      // setAnnonces(matches);
      ///annonces = matches;

      // this.number++;
    }

  };
  return (
    <Box
      mr={'10%'}
      ml={'10%'}
      direction={{ base: 'column', md: 'row' }}
      mt={8}
      mb={4}
      minH={'50vh'}
      
      border={'1px solid #dfdfdf'}
      rounded="md"
      p="2"
      _hover={{
        boxShadow: '2xl',
        p: '2',
        rounded: 'md'
      }}
      bg="white">
      <Tabs variant="enclosed">
        <Text as="h3" color={'gray.600'} my={4} ml={4}>
          Que faites-Vous ?
        </Text>
        <TabList w={'100%'}>
          <Tab w={'50%'}>
            {' '}
            <Icon as={FaMoneyBill} color="#ff7143" fontSize={20} mr={2} /> Achat
          </Tab>
          <Tab w={'50%'}>
            <Icon as={FaCar} color="#ff7143" fontSize={20} mr={2} />
            Location
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form onSubmit={handleSubmit(search)}>
              <Stack
                direction={{ base: 'column', md: 'row', sm: 'row' }}
                justifyContent="space-between"
                mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaCar} color="#ff7143" />} />
                  <Select
                      id="marque"
                      name="marque"
                      {...register('marque')}
                      rounded={'5'}
                      onChange={loadModeles}>
                        <option value='0'>Marque...</option>
                      {marques.map((marque, index) => (
                        <option key={marque.id} value={marque.id}>
                          {marque.libelle}
                        </option>
                      ))}
                    </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaWrench} color="#ff7143" />} />
                  {/* <InputLeftElement children={<Icon as={FaWrench} color='#ff7043' />}pl={2} pr={6}/> */}
                  <Select
                      id="modele"
                      name="modele"
                      rounded={'5'}
                      {...register('modele')}>
                        <option value='0'>Modele...</option>
                      </Select>
                </InputGroup>
              </Stack>
              <Stack direction={{ base: 'column', md: 'row', sm: 'row' }} mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaCalendar} color="#ff7143" />} />
                  <Input type="number" placeholder="Annee" id="annee" name="annnee" {...register('annee')}  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaFire} color="#ff7143" />} pr={4} />
                  <Select id="carburant" name="carburant" {...register('carburant')}  rounded>
                    <option value="0">Carburant</option>
                    <option value="Essence">Essence</option>
                    <option value="Gasoil">Gasoil</option>
                    <option value="Electrique">Electrique</option>
                  </Select>
                </InputGroup>
              </Stack>
              <Stack direction={{ base: 'column', md: 'row', sm: 'row' }} mt={8}>
              <InputGroup>
                  <InputLeftAddon children={<Icon as={FaWaveSquare} color="#ff7143" />} pr={4} />
                  <Select id="transmission"  name="transmision" {...register('transmission')} rounded>
                    <option value="0">Transmission</option>
                    <option value="manuelle">Manuelle</option>
                    <option value="automatique">Automatique</option>
                    <option value="semi">Semi-automatique</option>
                  </Select>
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaRoad} color="#ff7143" />} pr={4} />
                  <Select id="etat"  name="etat" {...register('etat')} rounded>
                    <option value="0">Etat</option>
                    <option value="neuve">Neuve</option>
                    <option value="occasion">Occasion</option>
                  </Select>
                </InputGroup>
              </Stack>
              <Stack direction={'row'} mt={10}>
                <Button
                  type="submit"
                  bg={'#ff7143'}
                  color={'white'}
                  _hover={{
                    bg: '#ff7143'
                  }}>
                  Rechercher
                </Button>
              </Stack>
            </form>
          </TabPanel>
          <TabPanel>
            <form>
              <Stack
                direction={{ base: 'column', md: 'row', sm: 'row' }}
                justifyContent="space-between"
                mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaCar} color="#ff7143" />} />
                  <Input type="text" placeholder="Marque" />
                </InputGroup>
                <InputGroup justifyContent={'space-between'}>
                  <InputLeftAddon children={<Icon as={FaWrench} color="#ff7143" />} />
                  <Select placeholder="Modele" rounded>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </InputGroup>
              </Stack>
              <Stack direction={'row'} mt={8}>
                <Button
                  type="submit"
                  bg={'#ff7143'}
                  color={'white'}
                  align="center"
                  _hover={{
                    bg: '#ff7143'
                  }}>
                  Rechercher
                </Button>
              </Stack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
