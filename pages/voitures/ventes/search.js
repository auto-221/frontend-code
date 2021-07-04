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
    InputRightAddon,
    InputRightElement,
    Select,
    Tabs, 
    TabList,
    TabPanels, 
    Tab, 
    TabPanel,
    useColorModeValue,
    Icon,
    Slider,
    SliderFilledTrack,
    SliderTrack,
    SliderThumb
} from '@chakra-ui/react';
import { FaSearch, FaCalendar, FaFire, FaWaveSquare, FaRoad, FaFilter,FaUserFriends} from 'react-icons/fa';
import { MdCancel} from 'react-icons/md';
import Base from '../../../components/layout/Base';
//import { FaCar } from "react-icons/md"
export default function Search(){
    return(
        <Base>
            <Flex direction={{ base: 'column', md: 'row' }} >
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
                width={{base:'100%', md:'20%'}}
                >
                <Box  borderBottom={'1px solid #dfdfdf'} w={'100%'} mb={'4'}>
                        <Stack mb={'2'}>
                            <Text as="h6" fontSize={12} color={'gray.600'}>
                                FILTRER LES RESULTATS
                            </Text>
                        </Stack>
                </Box>
                <Box p={'2'}>
                    <form>
                            <Stack>
                                <Text mb="8px">Prix de la voiture</Text>
                                <Slider defaultValue={60} min={0} max={300} step={30}>
                                    <SliderTrack bg="red.100">
                                        <Box position="relative" right={10} />
                                        <SliderFilledTrack bg="tomato" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                </Slider>
                            </Stack>
                            <Stack mt={'4'}>
                                <InputGroup >
                                    <InputLeftAddon children={<Icon as={FaUserFriends} color='#ff7143' />} />
                                    <Input type="number" placeholder="Nombres de place"  />
                                </InputGroup>
                            </Stack>
                            <Stack mt={'4'}>
                                <InputGroup >
                                    <InputLeftAddon children={<Icon as={FaCalendar} color='#ff7143' />} />
                                    <Input type="number" placeholder="Annee" />
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <InputGroup>
                                    <InputLeftAddon children={<Icon as={FaRoad} color='#ff7143' />} pr={4}/>
                                    <Select placeholder="Etat..." rounded>
                                        <option value="neuve">Neuve</option>
                                        <option value="occasion">Ocasion</option>
                                    </Select>   
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <InputGroup>
                                    <InputLeftAddon children={<Icon as={FaWaveSquare} color='#ff7143' />} pr={4}/>
                                    <Select placeholder="Transmission" rounded>
                                        <option value="manuelle">Manuelle</option>
                                        <option value="automatique">Automatique</option>
                                        <option value="semi">Semi-automatique</option>
                                    </Select>   
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <InputGroup >
                                    <InputLeftAddon children={<Icon as={FaFire} color='#ff7143' />} />
                                    <Select placeholder="Carburant" rounded>
                                        <option value="essence">Essence</option>
                                        <option value="gasoil">Gasoil</option>
                                    </Select>
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <Button colorScheme="blue" leftIcon={<FaFilter/>}>
                                    Filtrer
                                </Button>
                            </Stack>

                            <Stack mt={'4'}>
                                <Button colorScheme="red" leftIcon={<MdCancel/>}>
                                    Annuler filtrage
                                </Button>
                            </Stack>
                    </form>
                </Box>

                </Box>
                <Box width={{base:'100%', md:'80%'}}
                 mt={{base:'5', md:'0' }}
                >
                    <Stack  bg="white">
                        <InputGroup rounded>
                            <Input placeholder=""  rounded/>
                            <InputRightAddon children={<Icon as={FaSearch} color='#ff7143' />}  rounded  />
                        </InputGroup>
                    </Stack>
                </Box>
            </Flex>    
        </Base>
    );
}