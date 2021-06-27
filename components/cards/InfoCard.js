import {
  Flex,
  Circle,
  Box,
  Text,
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

// import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
// import { FiShoppingCart } from 'react-icons/fi';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
const data = {
  isNew: true,
  imageURL:
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
  name: 'BMW X6',
  price: 12000000,
  rating: 4.2,
  numReviews: 34
};

function InfoCard() {
  return (
    <Flex p={50} w="full" direction={{ base: 'column', md: 'row' }} alignItems="center" justifyContent="center" >
      <Box
        direction={{ base: 'column', md: 'row' }}
        bg={useColorModeValue('white', 'gray.800')}
        w="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
          
        {data.isNew && <Circle size="10px" position="absolute" top={2} right={2} bg="orange" />}
        <AwesomeSlider >
          <div data-src="/hero.jpeg" />
          <div data-src="/bmw.jpg" />
          <div data-src="/peugeot.jpg" />
        </AwesomeSlider>
        {/* <Image src={data.imageURL} alt={`Picture of ${data.name}`} roundedTop="lg" /> */}

        <Box p="6" mt={10}>
          {/* <Box d="flex" alignItems="baseline">
            {data.isNew && (
              <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="orange">
                New
              </Badge>
            )}
          </Box> */}
          <Flex mt="1"  justifyContent="space-between" alignContent="center">
            <Box >
              <Heading as={'h5'} mb={'2'} size="md" align={'left'}>Toyota Rav 4</Heading>
              <Text  as="h3" size="xs" >Prix< ChevronRightIcon  /> 80000</Text> 
              <Text  as="h3" size="xs" >carburant< ChevronRightIcon  /> Essence</Text> 
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
                            
            {/* <Box fontSize="2xl" color={useColorModeValue('orange', 'white')}>
              <Box as="span" color={'orange'} fontSize="lg"></Box>
              {data.price.toFixed(2)}
            </Box> */}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default InfoCard;
