import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';



const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function Service() {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
    <Box p={30}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'Achat de Voiture'}
          text={
            'Lorem ipsum dolor sit amet, '
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Location voiture'}
          text={
            'Lorem ipsum dolor sit amet'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} justifyContent="center" />}
          title={'Vente de Voiture'}
          text={
            'Lorem ipsum dolor sit amet...'
          }
        />
      </SimpleGrid>
    </Box>
    </Flex>
    );
}