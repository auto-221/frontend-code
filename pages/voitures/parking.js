/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import {
  Flex,
  Circle,
  Box,
  Text,
  SimpleGrid,
  Heading,
  useColorModeValue,
  Button,
  Center,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  InputRightAddon,
  InputGroup,
  Input,
  Stack,
  FormLabel,
  Textarea,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FaTrash, FaEdit, FaCar } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { useState, useEffect, Component } from 'react';
//import { useState } from 'react';

// import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// import { FiShoppingCart } from 'react-icons/fi';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { getCookie } from 'cookies-next';
import Base from '../../components/layout/Base';
import { useRouter } from 'next/router';

let modele = [];
let parking = {};

async function setParking(data) {
  for (let index = 0; index < data.length; index++) {
    const marqueRequest = await fetch(
      'http://localhost:1337/parkings/' + data[index].voiture.parking
    );
    parking = await marqueRequest.json();
  }
  for (let i = 0; i < data.length; i++) {
    data[i]['nom'] = parking.nom;
  }
  return data;
}

async function setMarque(data) {
  for (let index = 0; index < data.length; index++) {
    const marqueRequest = await fetch(
      'http://localhost:1337/modeles/' + data[index].voiture.modele
    );
    modele.push(await marqueRequest.json());
  }
  for (let i = 0; i < data.length; i++) {
    data[i]['modele'] = modele[i];
  }
  return data;
}

// const parking = localStorage.getItem('parkingInfo');

export async function getServerSideProps({ req, resu }) {
  const parking = getCookie('parking', { req, resu });
  const res = await fetch('http://localhost:1337/annonces');
  let data = await res.json();
  data = data.filter((annonces) => annonces.voiture.parking === Number(parking));
  data = await setParking(data);
  console.log(data);
  let x = data.length;
  data = await setMarque(data);
  // console.log('yeah' + x.length);
  return {
    props: {
      data,
      x
    }
  };
}

export default function Parking({ data, x }) {
  const router = useRouter();
  const { isOpen: isClotureOpen, onOpen: onClotureOpen, onClose: onClotureClose } = useDisclosure();
  const { isOpen: isRentOpen, onOpen: onRentOpen, onClose: onRentClose } = useDisclosure();
  const toast = useToast();
  // const [annonce, setAnnonce] = useState({})
  let annonce = {};
  const finalRef = React.useRef()
 

  //   useEffect(() => {
  //     parking = localStorage.getItem('parkingInfo');
  //   });


  const alertSuccess = () => {
    toast({
      title: 'Suppression.',
      description: 'Annonce supprimée. Merci',
      status: 'success',
      duration: 9000,
      isClosable: true
    });
  };

  const getAnnonce = (annonceInfos) => {
    annonce = annonceInfos;
   // setAnnonce(annonce);
  }

  const clotureAnnonce = async (annonce) => {
    annonce.etat = 0;
    const res = await fetch('http://localhost:1337/annonces/' + annonce.id, {
      body: JSON.stringify(annonce),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    });
  
    const result = await res.json();
    if( result ) {
      alertSuccess();
    }
  }

  const api = 'http://localhost:1337';

  return (
    <>
      <Base>
        <Center>
          <Heading as={'h3'}>{data[0].nom}</Heading>
        </Center>
        <Center h="100px" mt={'-5'}>
          <Badge borderRadius="full" px="2" colorScheme="orange">
            {x} annonce(s) publiée(s)
          </Badge>
          <Badge borderRadius="full" px="2" colorScheme="orange" ml="4">
            1 voiture(s) en location
          </Badge>
        </Center>
        <SimpleGrid columns={{ base: '1', lg: '4' }}>
          {data.map((vente) => (
            <Flex
              ref={finalRef} tabIndex={-1}
              key={vente.id}
              p={50}
              w="full"
              direction={{ base: 'column', md: 'row' }}
              alignItems="center"
              justifyContent="center">
              <Box
                direction={{ base: 'column', md: 'row' }}
                width={{ base: '100%', md: '20%' }}
                maxW="sm"
                bg={useColorModeValue('white', 'gray.800')}
                w={{ base: 'md', md: 'column' }}
                mt={{ base: '5', md: '0' }}
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">
                {data.isNew && (
                  <Circle size="10px" position="absolute" top={2} right={2} bg="orange" />
                )}
                <AwesomeSlider>
                  {vente.voiture.photo1.map((photos, index) => {
                    if (photos.formats) {
                      return <div key={index} data-src={api + photos.formats.thumbnail.url} />;
                    } else {
                      return <div key={index} data-src={api + photos.url} />;
                    }
                  })}
                </AwesomeSlider>
                {/* <Image src={data.imageURL} alt={`Picture of ${data.name}`} roundedTop="lg" /> */}

                <Box p="6" mt={10}>
                  <Flex mt="1" justifyContent="space-between" alignContent="center">
                    <Box>
                      <Heading as={'h5'} mb={'2'} size="md" align={'left'}>
                        {vente.modele.marque.libelle} {vente.modele.libelle}
                      </Heading>
                      <Text as="h3" size="xs">
                        Prix
                        <ChevronRightIcon /> {vente.prix}
                      </Text>
                      <Text as="h3" size="xs">
                        carburant
                        <ChevronRightIcon /> {vente.voiture.carburant}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex justifyContent={'center'}>
                    {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                    <FaTrash size="20px" color="#E53E3E" onClick={getAnnonce(vente), onClotureOpen} />
                    <FaEdit size="20px" color="#3182ce" ml={'4'} 
                    onClick={() =>
                      router.push({
                        pathname: '/voitures/[updateParking]',
                        query: { updateParking: vente.id }
                      })
                    }/>
                  </Flex>

                  <Flex justifyContent={'center'}>
                    {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                    <Button
                      mt={'2'}
                      leftIcon={<FaCar />}
                      w={'100%'}
                      type="submit"
                      bg={'#ff7143'}
                      color={'white'}
                      _hover={{
                        bg: '#ff7143'
                      }}
                      onClick={onRentOpen}>
                      Mettre en location
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          ))}
        </SimpleGrid>
        <Modal finalFocusRef={finalRef} isOpen={isClotureOpen} onClose={onClotureClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Clôturer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Center>Voulez-vous vraiment cloturer cette annonce ! </Center>
            </ModalBody>

            <ModalFooter>
              <Button bg="#ff7143" onClick={() => clotureAnnonce(annonce)} leftIcon={<MdCancel />} color={'white'}>
                Clôturer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isRentOpen} onClose={onRentClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Informations location</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
                <FormLabel flex={1}>Montant</FormLabel>
                <InputGroup>
                  <Input placeholder="Montant à payer" />
                  <InputRightAddon children="FCFA/Jour" />
                </InputGroup>
                <FormLabel flex={1}>Description</FormLabel>
                <InputGroup>
                  <Textarea />
                </InputGroup>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onRentClose}>
               Mettre en location
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Base>
    </>
  );
}
