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
import { FaSearch,FaFacebook, FaCalendar, FaFire, FaWaveSquare, FaRoad, FaFilter,FaUserFriends,FaInfo, FaMapMarkerAlt} from 'react-icons/fa';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BsPersonFill } from "react-icons/bs"
import { MdCall } from "react-icons/md"
export default function Ventes(){
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
                        <Text fontWeight={'bold'}>Mercedes Benz</Text>
                        <Text  as="h3" size="xs" >Prix< ChevronRightIcon  /> 1390094</Text> 
                        <Text  as="h3" size="xs" >Carburant< ChevronRightIcon  /> 333333</Text>
                        <Text  as="h3" size="xs" >Transmission< ChevronRightIcon  /> manuelle</Text>
                        <Text  as="h3" size="xs" >kilometrage< ChevronRightIcon  /> 1200000</Text>
                        <Text  as="h3" size="xs" >Année< ChevronRightIcon  />2019</Text>
                        <Text  as="h3" size="xs" >Description de xxxx</Text>
                        <Divider orientation="horizontal" colorScheme={'blackAlpha'} fontWeight={'bold'} width={'100%'} mt={2}/>
                        <Stack>
                        <Text  as="h3" size="xs" >
                            <Button width={5} rounded="70" bg="#0277bd" mr="10">
                                <Center>
                                <BsPersonFill color='white'/>
                                </Center>
                            </Button>
                            Description de xxxx
                            </Text>
                        </Stack>
                        <Stack>
                        <Text  as="h3" size="xs" >
                            <Button width={5} rounded="70" bg="#66bb6a" mr="10">
                                <Center>
                                <MdCall color='white'/>
                                </Center>
                            </Button>
                            +221 773343173
                            </Text>
                        </Stack>
                        <Stack>
                        <Text  as="h3" size="xs" >
                            <Button width={5} rounded="70" bg="#ff7043" mr="10">
                                <Center>
                                <FaMapMarkerAlt color='white'/>
                                </Center>
                            </Button>
                            New York City
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </Base>   
    );
}