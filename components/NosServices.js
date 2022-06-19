/* eslint-disable react/react-in-jsx-scope */
import {
    Button,
    Text,
    Flex,
    Stack,
    Icon,
    Box
} from '@chakra-ui/react';
import { FaMicrophoneAlt, FaCar} from 'react-icons/fa';
export default function NosServices(){
    return(
        <Flex direction={{ base: 'column', md: 'row' }}  
            justify={'center'} minH={'30vh'} ml={{base:0, md:'23%'}} mr={{base:0, md:'23%'}} > 
            <Box 
            // minH={'30vh'}
            minH={{base:'0', md:'30vh'}}
                display={'flex'} 
                direction={'row'} 
                justify={'center'}
                position={'relative'} 
                borderRadius={'.1875rem'} 
        
                bg="white"
                mr={{base:'0', md:'4'}}
                
                p={'4'}
                
                mb={ 4}
                _hover={{
                    boxShadow:"2xl", p:"4", rounded:"md" , mb:'4'
                }}
                >
                <Stack alignSelf={'center !important'} >
                    <Icon as={FaMicrophoneAlt} color='#ff7143' fontSize={'3em'} mr={2}/>
                </Stack>
                <Stack textAlign={'right !important'} fontWeight={'550'}>
                    <Text color={'#000000'}  fontSize={'15px'}>Achat et vente de voitures</Text>
                    <Text  color={'black'} fontSize={'15px'}>
                        Trouvez la voiture parfaite sur Auto221 ou créez votre compte et commencez a publier 
                        vos annonces.
                        <br/>
                        <Button
                        type='submit'
                        bg={'#0277bd'}
                        color={'white'}
                        mt={{base:'6', md:'6'}}
                        _hover={{
                            bg: 'orange.500',
                        }}>
                        Devenir annonceur
                    </Button>
                    </Text>
                </Stack>
            </Box>

            <Box 
            minH={{base:'0', md:'30vh'}}
                display={'flex'} 
                direction={'column'}
                position={'relative'} 
                borderRadius={'.1875rem'} 
                p={'4'}
                
                mb={ 4}
                _hover={{
                    boxShadow:"2xl", p:"4", rounded:"md" , mb:'4'
                }}
                bg="white">
                <Stack alignSelf={'center !important'}>
                    <Icon as={FaCar} color='#ff7143' fontSize={'3em'} mr={2}/>
                </Stack>
                <Stack textAlign={'right !important'} fontWeight={'550'}>
                    <Text color={'#000000'}  fontSize={'15px'}>Location de voitures</Text>
                    <Text  color={'black'} fontSize={'15px'}>
                        Trouvez rapidement une voiture de location correspondant à vos besoins avec nos parkings.
                        <br/>
                        <Button
                        type='submit'
                        bg={'#0277bd'}
                        color={'white'}
                        mt={6}
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