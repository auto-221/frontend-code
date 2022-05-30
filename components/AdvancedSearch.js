/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-duplicate-props */
import {
  Button,
  Text,
  Input,
  Box,
  Stack,
  InputGroup,
  InputLeftAddon,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  Icon
} from '@chakra-ui/react';
import {
  FaCar,
  FaWrench,
  FaCalendar,
  FaFire,
  FaWaveSquare,
  FaRoad,
  FaMoneyBill
} from 'react-icons/fa';
//import { FaCar } from "react-icons/md"
export default function AdvancedSearch() {
  return (
    <Box
      mr={'10%'}
      ml={'10%'}
      direction={{ base: 'column', md: 'row' }}
      mt={8}
      mb={4}
      bg={useColorModeValue('gray.50', 'gray.1800')}
      border={'1px solid #dfdfdf'}
      rounded="md"
      p="2"
      _hover={{
        boxShadow: '2xl',
        p: '2',
        rounded: 'md'
      }}
      bg="white">
      <Tabs variant="enclosed">
        <Text as="h3" color={'gray.600'} my={4} ml={4}>
          Que faites-Vous ?
        </Text>
        <TabList w={'100%'}>
          <Tab w={'50%'}>
            {' '}
            <Icon as={FaMoneyBill} color="#ff7143" fontSize={20} mr={2} /> Achat
          </Tab>
          <Tab w={'50%'}>
            <Icon as={FaCar} color="#ff7143" fontSize={20} mr={2} />
            Location
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form>
              <Stack
                direction={{ base: 'column', md: 'row', sm: 'row' }}
                justifyContent="space-between"
                mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaCar} color="#ff7143" />} />
                  <Input type="text" placeholder="Marque" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaWrench} color="#ff7143" />} />
                  {/* <InputLeftElement children={<Icon as={FaWrench} color='#ff7043' />}pl={2} pr={6}/> */}
                  <Select placeholder="Modele" rounded>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </InputGroup>
              </Stack>
              <Stack direction={{ base: 'column', md: 'row', sm: 'row' }} mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaCalendar} color="#ff7143" />} />
                  <Input type="number" placeholder="Annee" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaFire} color="#ff7143" />} pr={4} />
                  <Input type="text" placeholder="Kilometrage" />
                </InputGroup>
              </Stack>
              <Stack direction={{ base: 'column', md: 'row', sm: 'row' }} mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaWaveSquare} color="#ff7143" />} />
                  <Input type="text" placeholder="Transmission" />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaRoad} color="#ff7143" />} pr={4} />
                  <Select placeholder="Type" rounded>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </InputGroup>
              </Stack>
              <Stack direction={'row'} mt={8}>
                <Button
                  type="submit"
                  bg={'#ff7143'}
                  color={'white'}
                  _hover={{
                    bg: '#ff7143'
                  }}>
                  Rechercher
                </Button>
              </Stack>
            </form>
          </TabPanel>
          <TabPanel>
            <form>
              <Stack
                direction={{ base: 'column', md: 'row', sm: 'row' }}
                justifyContent="space-between"
                mt={8}>
                <InputGroup>
                  <InputLeftAddon children={<Icon as={FaCar} color="#ff7143" />} />
                  <Input type="text" placeholder="Marque" />
                </InputGroup>
                <InputGroup justifyContent={'space-between'}>
                  <InputLeftAddon children={<Icon as={FaWrench} color="#ff7143" />} />
                  <Select placeholder="Modele" rounded>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </InputGroup>
              </Stack>
              <Stack direction={'row'} mt={8}>
                <Button
                  type="submit"
                  bg={'#ff7143'}
                  color={'white'}
                  align="center"
                  _hover={{
                    bg: '#ff7143'
                  }}>
                  Rechercher
                </Button>
              </Stack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
