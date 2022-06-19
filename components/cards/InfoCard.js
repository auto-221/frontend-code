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
  Button
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { FaInfo } from 'react-icons/fa';
//import { useState } from 'react';

// import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// import { FiShoppingCart } from 'react-icons/fi';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';

function InfoCard({ data }) {
  // const [latest, setLatest] = useState(data)

  const api = 'http://localhost:1337';

  return (
    <SimpleGrid columns={{ base: '1', lg: '3' }} >
      {data.map((vente) => (
        <Flex
          key={vente.id}
          mt={'8'}
          // p={50}
          // w="full"
          // direction={{ base: 'row', md: 'column' }}
          alignItems="center"
          justifyContent="center">
          <Box
            bg={useColorModeValue('white', 'gray.800')}
            w={{ base: '80%', md: '60%' }}
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative">
            {data.isNew && <Circle size="10px" position="absolute" top={2} right={2} bg="orange" />}
            <AwesomeSlider rounded="lg" animation="cubeAnimation" height={'30px'}>
              <div data-src={api + vente.voiture.photo1[0].formats.thumbnail.url} />
              <div data-src="/bmw.jpg" />
              <div data-src="/peugeot.jpg" />
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
                <Button
                  mt={'2'}
                  leftIcon={<FaInfo />}
                  w={'100%'}
                  type="submit"
                  bg={'#ff7143'}
                  color={'white'}
                  _hover={{
                    bg: '#ff7143'
                  }}>
                  Details
                </Button>
              </Flex>
            </Box>
          </Box>
        </Flex>
      ))}
    </SimpleGrid>
  );
}

export default InfoCard;
