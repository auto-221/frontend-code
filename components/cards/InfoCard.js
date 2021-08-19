import {
  Flex,
  Circle,
  Box,
  Text,
  SimpleGrid,
  Image,
  Heading,
  Badge,
  useColorModeValue,
  Button,
  Icon,
  chakra,
  Tooltip
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { FaInfo} from 'react-icons/fa';
import {useState, useEffect} from 'react'

// import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// import { FiShoppingCart } from 'react-icons/fi';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';


function InfoCard({data}) {

  const [latest, setLatest] = useState(data)

  const api='http://localhost:1337'; 

  return (
    <SimpleGrid columns={{ base: '1', lg: '4' }} >
                   
                    {data.map(
                            (vente)=>
                        <Flex key={vente.id} 
                            p={50} w="full" direction={{ base: 'column', md: 'row' }} 
                            alignItems="center" justifyContent="center" 
                        >
                            <Box 
                                direction={{ base: 'column', md: 'row' }}
                                width={{base:'100%', md:'10%'}}
                                maxW="sm"
                               
                                bg={useColorModeValue('white', 'gray.800')}
                            
                                w={{ base: 'md', md: 'column' }}
                                mt={{base:'5', md:'0' }}
                                borderWidth="1px"
                                rounded="lg"
                                shadow="lg"
                                position="relative">
                                
                                {data.isNew && <Circle size="10px" position="absolute" top={2} right={2} bg="orange" />}
                                <AwesomeSlider>
                                <div data-src={api + vente.voiture.photo1[0].formats.thumbnail.url} />
                                <div data-src="/bmw.jpg" />
                                <div data-src="/peugeot.jpg" />
                                </AwesomeSlider>
                                {/* <Image src={data.imageURL} alt={`Picture of ${data.name}`} roundedTop="lg" /> */}

                                <Box p="6" mt={10}>
                    
                                    <Flex mt="1"  justifyContent="space-between" alignContent="center">
                                        <Box >
                                        <Heading as={'h5'} mb={'2'} size="md" align={'left'}>{vente.marqueAndModel[0].libelle} {vente.marqueAndModel[0].modeles[0].libelle}
                                        </Heading>
                                        <Text  as="h3" size="xs" >Prix< ChevronRightIcon  /> {vente.prix}</Text> 
                                        <Text  as="h3" size="xs" >carburant< ChevronRightIcon  /> {vente.voiture.carburant}</Text> 
                                        </Box>
                                    
                                    </Flex>

                                    <Flex  justifyContent={'center'}>
                                        {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                                        <Button
                                            mt={'2'}
                                            leftIcon={<FaInfo />}
                                            w={'100%'}
                                            type='submit'
                                            bg={'#ff7143'}
                                            color={'white'}
                                            _hover={{
                                                bg: '#ff7143',
                                            }}>
                                            Details 
                                        </Button>
                                    </Flex>
                                </Box>
                            </Box> 
                            
                        </Flex> 
                     )}   
                                
                    </SimpleGrid> 
  );
}

export default InfoCard;
