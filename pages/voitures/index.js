/* eslint-disable react/react-in-jsx-scope */
import { Flex, Circle, Box, Image, Badge, useColorModeValue, chakra } from '@chakra-ui/react';
import Base from '../../components/layout/Base';
import { SimpleGrid } from '@chakra-ui/layout';

export async function getServerSideProps() {
  const res = await fetch('http://localhost:1337/annonces');
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data
    }
  };
}
const Ventevoiture = ({ data }) => {
  const api = 'http://localhost:1337';

  return (
    <>
      <Base>
        <SimpleGrid columns={3} spacing={2}>
          {data.map((post) => (
            <Box
              key={post}
              bg={useColorModeValue('white', 'gray.800')}
              maxW="sm"
              borderWidth="1px"
              rounded="lg"
              shadow="lg"
              position="relative">
              {<Circle size="10px" position="absolute" top={2} right={2} bg="orange" />}

              <Image
                src={api + post.voiture.photo1[0].formats.thumbnail.url}
                alt={`Picture of ${post.description}`}
                roundedTop="lg"
              />

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="orange">
                    {post.description}
                  </Badge>
                  <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red" spacing={2}>
                    {post.voiture.annee}
                  </Badge>
                </Box>
                <Box d="flex" mt="3" alignItems="baseline">
                  <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="green" spacing={2}>
                    {post.voiture.transmission}
                  </Badge>
                  <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="mycolor" spacing={2}>
                    {post.voiture.carburant}
                  </Badge>
                </Box>
                <Flex mt="3" justifyContent="space-between" alignContent="center">
                  <Box fontSize="2xl" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {/* {post.type} */}
                  </Box>
                  <Tooltip
                    label="Add to cart"
                    bg="white"
                    placement={'top'}
                    color={'gray.800'}
                    fontSize={'1.2em'}>
                    <chakra.a href={'#'} display={'flex'}>
                      {/* <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} /> */}
                    </chakra.a>
                  </Tooltip>
                </Flex>

                <Flex justifyContent="space-between" alignContent="center">
                  {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
                  <Box fontSize="2xl" color={useColorModeValue('mycolor', 'mycolor')}>
                    <Box as="span" colorScheme="mycolor" fontSize="lg"></Box>
                    {post.prix.toFixed(2)}
                  </Box>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Base>
    </>
  );
};

export default Ventevoiture;
