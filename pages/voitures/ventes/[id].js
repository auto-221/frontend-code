import {
    Button, 
    Text,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Box,
    Link,
    Stack,
    Divider,
    RadioGroup,
    Radio,
    Image,
    InputGroup,
    InputLeftElement,
    InputGroupAddon,
    InputLeftAddon,
    InputRightElement,
    Select,
    Tabs, 
    TabList,
    TabPanels, 
    Tab, 
    TabPanel,
    useColorModeValue,
    Icon,
    Center
} from '@chakra-ui/react';
import Base from '../../../components/layout/Base';
import AwesomeSlider from 'react-awesome-slider';
import {FaMapMarkerAlt} from 'react-icons/fa';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BsPersonFill } from "react-icons/bs"
import { MdCall } from "react-icons/md"

let marqueAndModel 

async function getMarque(marque) {
    const res = await fetch('http://localhost:1337/marques?id='+ marque)
    let result = await res.json()
    console.log(result)
    return result
}


export async function getServerSideProps({ params })
  {
    const res = await fetch('http://localhost:1337/annonces/'+ params.id +'?type=vente')
    // const res = await fetch('http://localhost:1337/annonces?_start='+ start +'&_limit='+ limit +'&type=vente')
    let data = await res.json()
    let voiture = {
        marque: ''
    }

    marqueAndModel = await getMarque(data.voiture.modele)
    data.marque = marqueAndModel[0].libelle
    data.modele = marqueAndModel[0].modeles[0].libelle
    // voiture.modele = marqueAndModel.modeles.libelle
    // voiture.annee = data.voiture.annee


    return {
      props: {
        data
      }, 
    }
  }
export default function Ventes({data}){

    
    return(
        <Base>
        <Flex direction={{ base: 'column', md: 'row' }} h={'100%'}
        mr={'10%'} ml={'10%'} direction={{ base: 'column', md: 'row' }} mt={8} mb={4}
        bg={useColorModeValue('gray.50', 'gray.1800')}
        border={'1px solid #dfdfdf'}
        rounded="md"
        p="2"
        _hover={{
            boxShadow:"2xl", p:"2", rounded:"md"
        }}
        bg="white">
                <Box
            
                direction={{ base: 'row', md: 'column' }}
                bg={useColorModeValue('gray.50', 'gray.1800')}
                border={'1px solid #dfdfdf'}
                rounded="md"
                mr="4"
                p='2'
                _hover={{
                    boxShadow:"2xl", p:"2", rounded:"md"
                }}
                bg="white"
                width={{base:'100%', md:'40%'}}
                >
                    <AwesomeSlider>
                               
                                <div data-src="/bmw.jpg" />
                                <div data-src="/peugeot.jpg" />
                                </AwesomeSlider>
                </Box>
                <Box width={{base:'100%', md:'50%'}} 
                 mt={{base:'5', md:'0' }}
                 maxH={'100%'}
                 mr={{base:'5', md:'0' }}
                
                >
                    <Stack  ml={{base:'5', md:'20%' }}>
                        <Text fontWeight={'bold'}> {data.marque} {data.modele}</Text>
                        <Text  as="h3" size="xs" >Prix< ChevronRightIcon  /> {data.prix}</Text> 
                        <Text  as="h3" size="xs" >Carburant< ChevronRightIcon  /> {data.voiture.carburant}</Text>
                        <Text  as="h3" size="xs" >Transmission< ChevronRightIcon  /> {data.voiture.transmission}</Text>
                        {(() => {

                            if (data.kilometrage) {

                            return  <Text  as="h3" size="xs" >kilometrage< ChevronRightIcon  /> {data.voiture.kilometrage}</Text>;

                            } else {
                    

                            }

                        })()}
                        <Text  as="h3" size="xs" >Année< ChevronRightIcon  />{data.voiture.annee}</Text>
                        <Text  as="h3" size="xs" >{data.description}</Text>
                        <Divider orientation="horizontal" colorScheme={'blackAlpha'} fontWeight={'bold'} width={'100%'} mt={2}/>
                        <Stack>
                        <Text  as="h3" size="xs" >
                            <Button width={5} rounded="70" bg="#0277bd" mr="10">
                                <Center>
                                <BsPersonFill color='white'/>
                                </Center>
                            </Button>
                                {data.users_permissions_user.username}
                            </Text>
                        </Stack>
                        <Stack>
                        <Text  as="h3" size="xs" >
                            <Button width={5} rounded="70" bg="#66bb6a" mr="10">
                                <Center>
                                <MdCall color='white'/>
                                </Center>
                            </Button>
                                {data.users_permissions_user.tel}
                            </Text>
                        </Stack>
                        <Stack>
                        <Text  as="h3" size="xs" >
                            <Button width={5} rounded="70" bg="#ff7043" mr="10">
                                <Center>
                                <FaMapMarkerAlt color='white'/>
                                </Center>
                            </Button>
                                {data.users_permissions_user.adresse}
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </Base>   
    );
}