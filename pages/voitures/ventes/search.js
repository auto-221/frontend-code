import {
    Button,
    Text,
    SimpleGrid,
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
    Circle,
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
import { FaSearch, FaCalendar, FaFire, FaWaveSquare, FaRoad, FaFilter,FaUserFriends,FaInfo} from 'react-icons/fa';
import { ChevronRightIcon } from '@chakra-ui/icons'
import { MdCancel} from 'react-icons/md';
import Base from '../../../components/layout/Base';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import {useState, useEffect} from 'react'
import { Spinner } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";

const data = {
    isNew: true,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'BMW X6',
    price: 12000000,
    rating: 4.2,
    numReviews: 34
  };

// const resultsCopy = [];

// const [annonces, setAnnonces] = useState([])
let resultsCopy = []
let marqueAndModel = []
let dataSize
let number = 0;
let start = 0;
let limit = 9;
let page =0
let pages 
let numbers = [number]
let showScroll = false
let showScrollHeight = 300;
let hideScrollHeight = 10;


async function setMarque(data) {
    // for () {
    //     const element = array[index];
        
    // }
    for (let index = 0; index < data.length; index++) {
       const marqueRequest = await fetch('http://localhost:1337/marques?id='+ data[index].voiture.marque)
       marqueAndModel.push(await marqueRequest.json())
       //console.log(marqueAndModel)
       // data.push(marqueAndModel[index])
        // data.push(marqueAndModel)
    }
    for (let i = 0; i < data.length; i++) {
        data[i]['marqueAndModel'] = marqueAndModel[i];
        
    }
    return data
    // data.forEach(annonce => {
    //     data.push(marqueAndModel)
    // });

}

    async function getTotalElements() {
        const res = await fetch('http://localhost:1337/annonces/count?type=vente')
        let data = await res.json()
        console.log(data)
        return data;
    }

    function onWindowScroll() 
    {
        if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) 
        {
            showScroll = true;
        } 
        else if ( showScroll && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.hideScrollHeight) 
        { 
            showScroll = false; 
        }
    }

    function scrollToTop() 
    { 
        (function smoothscroll() 
        { var currentScroll = document.documentElement.scrollTop || document.body.scrollTop; 
            if (currentScroll > 0) 
            {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - (currentScroll / 5));
            }
        })();
    }

    

export async function getServerSideProps()
  {
    const res = await fetch('http://localhost:1337/annonces?_start='+ start +'&_limit='+ limit +'&type=vente')
    let data = await res.json()
    data = await setMarque(data)
    resultsCopy = data
    pages = await getTotalElements()
    console.log(pages)
    // setAnnonces(data)
    // setAnnonces(data)
    // resultsCopy = annonces
    // console.log(annonces);
    return {
      props: {
        data
      }, 
    }
  }

export default function Search({data}){

    const [annonces, setAnnonces] = useState(data)

    function redo() {
        setAnnonces(resultsCopy)
    }
    
    function filterArray() {
        let matches = []
        dataSize = annonces.length
        searchText = document.getElementById("searchText").value
        matches = annonces
        resultsCopy = annonces
        // if( matches === [] ) setAnnonces(annonces)
        if(!searchText) setAnnonces(resultsCopy) 
        searchText = searchText.toLocaleLowerCase()
        matches = matches.filter(annonce => {
            return annonce.marqueAndModel[0].libelle.toLocaleLowerCase().includes(searchText)
            || annonce.marqueAndModel[0].modeles[0].libelle.toLocaleLowerCase().includes(searchText) 
            || annonce.voiture.carburant.toLocaleLowerCase().includes(searchText) 
            // || String(annonce.voiture.carburant).toLocaleLowerCase().includes(searchText) 
            || annonce.voiture.transmission.toLocaleLowerCase().includes(searchText);
        })
        if (matches.length != 0) setAnnonces(matches)
        if (matches.length === 0) setAnnonces(resultsCopy)
        if(!searchText) {
            console.log(resultsCopy)
        }
      
        // console.log(matches)
    }

    function filter() {
        let matches = []
        matches = annonces
        resultsCopy = annonces
        console.log(matches)

        
        
        // if(document.getElementById("price").value != ''){
        //    // matches = matches.filter((annonce)=> annonce.voiture.carburant == document.getElementById("carburant").value)
        //     console.log(document.getElementById("price").value)
        // }

        if(document.getElementById("carburant").value != ''){
            matches = matches.filter((annonce)=> annonce.voiture.carburant == document.getElementById("carburant").value)
            console.log(matches)
        }

        if(document.getElementById("transmission").value != ''){
            matches = matches.filter((annonce)=> annonce.voiture.transmission == document.getElementById("transmission").value)
        }

        if(document.getElementById("annee").value!= ''){
            matches = matches.filter((annonce)=> annonce.voiture.annee == document.getElementById("annee").value)
        }

        if(document.getElementById("places").value!= ''){
            matches = matches.filter((annonce)=> annonce.voiture.places == document.getElementById("places").value)
        }

        if(document.getElementById("etat").value!= ''){
            matches = matches.filter((annonce)=> annonce.voiture.etat == document.getElementById("etat").value)
        }


        if(matches.length == 0){
           alert('oups')
          }else{
             setAnnonces(matches)
            //annonces = matches;
            
            // this.number++;
          }
    }
    
    if (typeof window === 'object') {
        // Check if document is finally loaded
        document.getElementById("kilometrage-group").style.display = "none";
    }

    function displayOrHideKm() {
        let etat = document.getElementById("etat")
        if (etat.value != 'neuve' && etat.value !=0) {
            console.log('bonjour')
            document.getElementById("kilometrage-group").style.display = "inherit";
        } else {
            document.getElementById("kilometrage-group").style.display = "none";
        }
    }

    async function onScroll(){
        console.log('youpi')
        limit += 9;
        start += 9;
        //this.loading = true;
        // this.loadData(this.offset).subscribe((data)=>{
        //   this.results.push.apply(this.results,data['annonces']);
        //   this.loading = false;
        // })  
        const res = await fetch('http://localhost:1337/annonces?_start='+ start +'&_limit='+ limit +'&type=vente')
        let data = await res.json()
        data = await setMarque(data)
        setAnnonces(annonces.concat(data))
    
    }
        
    
    return(
         
        
        <Base >
            <Flex direction={{ base: 'column', md: 'row' }} h={'100%'}>
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
                            <Stack id="prix">
                                <Text mb="8px">Prix de la voiture</Text>
                                <Slider id="price" defaultValue={60} min={0} max={300} step={30}>
                                    <SliderTrack bg="red.100">
                                        <Box position="relative" right={10} />
                                        <SliderFilledTrack bg="tomato" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                    
                                </Slider>
                            </Stack>
                            <Stack mt={'4'}>
                                <InputGroup >
                                    <InputLeftAddon  children={<Icon as={FaUserFriends} color='#ff7143' />} />
                                    <Input id='places' type="number" placeholder="Nombre de places"  />
                                </InputGroup>
                            </Stack>
                            <Stack mt={'4'}>
                                <InputGroup >
                                    <InputLeftAddon children={<Icon as={FaCalendar} color='#ff7143' />} />
                                    <Input id='annee' type="number" placeholder="Annee" />
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <InputGroup>
                                    <InputLeftAddon children={<Icon as={FaRoad} color='#ff7143' />} pr={4}/>
                                    <Select id='etat' onChange={displayOrHideKm}  rounded>
                                        <option value="0">Etat</option>
                                        <option value="neuve">Neuve</option>
                                        <option value="occasion">Occasion</option>
                                    </Select>   
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'} id="kilometrage-group">
                                <Text mb="8px">kilometrage</Text>
                                <Slider id="kilometrage" defaultValue={60} min={0} max={200000} step={30}>
                                    <SliderTrack bg="red.100">
                                        <Box position="relative" right={10} />
                                        <SliderFilledTrack bg="tomato" />
                                    </SliderTrack>
                                    <SliderThumb boxSize={6} />
                                    
                                </Slider>
                            </Stack>

                            <Stack mt={'4'}>
                                <InputGroup>
                                    <InputLeftAddon children={<Icon as={FaWaveSquare} color='#ff7143' />} pr={4}/>
                                    <Select placeholder="Transmission" id='transmission' rounded>
                                        <option value="manuelle">Manuelle</option>
                                        <option value="automatique">Automatique</option>
                                        <option value="semi">Semi-automatique</option>
                                    </Select>   
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <InputGroup >
                                    <InputLeftAddon children={<Icon as={FaFire} color='#ff7143' />} />
                                    <Select placeholder="Carburant" id='carburant' rounded>
                                        <option value="Essence">Essence</option>
                                        <option value="Gasoil">Gasoil</option>
                                    </Select>
                                </InputGroup>
                            </Stack>

                            <Stack mt={'4'}>
                                <Button onClick={filter} colorScheme="blue" leftIcon={<FaFilter/>}>
                                    Filtrer
                                </Button>
                            </Stack>

                            <Stack mt={'4'}>
                                <Button onClick={redo} colorScheme="red" leftIcon={<MdCancel/>}>
                                    Annuler filtrage
                                </Button>
                            </Stack>
                    </form>
                </Box>

                </Box>
                <Box width={{base:'100%', md:'80%'}}
                 mt={{base:'5', md:'0' }}
                 maxH={'100%'}
                >
                    <Stack  bg="white">
                        <InputGroup rounded>
                            <Input placeholder="" id='searchText'  onChange={filterArray}  rounded/>
                            <InputRightAddon children={<Icon as={FaSearch} color='#ff7143' />}  rounded  />
                        </InputGroup>
                    </Stack>
                    <InfiniteScroll
                        dataLength={getTotalElements}
                        next={onScroll}
                        hasMore={true}
                        loader={<h3> <Spinner /></h3>}
                        endMessage={<h4></h4>}
                    >
                    <SimpleGrid columns={{ base: '1', md: '3' }}>
                   
                    {annonces.map(
                            (vente)=>
                        <Flex key={vente.id} p={50} w="full" direction={{ base: 'column', md: 'row' }} alignItems="center" justifyContent="center" >
                        

                            <Box 
                                direction={{ base: 'column', md: 'row' }}
                                bg={useColorModeValue('white', 'gray.800')}
                            
                                w={{ base: 'md', md: 'column' }}
                                mt={{base:'5', md:'0' }}
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
                    </InfiniteScroll>
                </Box>
            </Flex>    
        </Base>
    );

}