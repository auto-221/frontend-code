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
    Icon
} from '@chakra-ui/react';
import { FaMicrophoneAlt, FaCar} from 'react-icons/fa';
export default function NosServices(){
    return(
        <Flex direction={{ base: 'column', md: 'row' }}   
            justify={'center'} minH={'25vh'} ml={{base:0, md:'23%'}} mr={{base:0, md:'23%'}} > 
            <Box 
                display={'flex'} 
                direction={'row'} 
                justify={'center'}
                position={'relative'} 
                borderRadius={'.1875rem'} 
                p={'4'}
                bg="white"
                mr={'4'}
                mb={ 4}
                _hover={{
                    boxShadow:"2xl", p:"2", rounded:"md"
                }}
                >
                <Stack alignSelf={'center !important'} >
                    <Icon as={FaMicrophoneAlt} color='#ff7143' fontSize={'3em'} mr={2}/>
                </Stack>
                <Stack textAlign={'right !important'} fontWeight={'550'}>
                    <Text color={'#000000'}  fontSize={'15px'}>Achat et vente de voitures</Text>
                    <Text  color={'black'} fontSize={'13px'}>
                        Trouvez la voiture parfaite sur Auto221 ou créez votre compte et commencez a publier 
                        vos annonces.
                        <br/>
                        <Button
                        type='submit'
                        bg={'#0277bd'}
                        color={'white'}
                        mt={2}
                        _hover={{
                            bg: 'orange.500',
                        }}>
                        Devenir annonceur
                    </Button>
                    </Text>
                </Stack>
            </Box>

            <Box 
                display={'flex'} 
                direction={'column'}
                position={'relative'} 
                borderRadius={'.1875rem'} 
                p={'4'}
                ml= {4}
                mb={ 4}
                _hover={{
                    boxShadow:"2xl", p:"2", rounded:"md"
                }}
                bg="white">
                <Stack alignSelf={'center !important'}>
                    <Icon as={FaCar} color='#ff7143' fontSize={'3em'} mr={2}/>
                </Stack>
                <Stack textAlign={'right !important'} fontWeight={'550'}>
                    <Text color={'#000000'}  fontSize={'15px'}>Location de voitures</Text>
                    <Text  color={'black'} fontSize={'13px'}>
                        Trouvez rapidement une voiture de location correspondant à vos besoins avec nos parkings.
                        <br/>
                        <Button
                        type='submit'
                        bg={'#0277bd'}
                        color={'white'}
                        mt={2}
                        _hover={{
                            bg: 'orange.500',
                        }}>
                        Faire une location
                    </Button>
                    </Text>
                </Stack>
            </Box>
        </Flex>
    );
}