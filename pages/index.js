import { Box, Heading, SimpleGrid } from '@chakra-ui/layout';
import Head from 'next/head';
import Image from 'next/image';
import InfoCard from '../components/cards/InfoCard';
import Info from '../components/cards/Info';
import SimpleSlider from '../components/cards/Slider';
import Hero from '../components/Hero';
import Base from '../components/layout/Base';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {getAnnonces} from '../lib/annonce';
import AdvancedSearch from '../components/AdvancedSearch';
import Services from '../components/Services';
import NosServices from '../components/NosServices';

export async function getServerSideProps()
  {
    const res = await fetch('http://localhost:1337/annonces?_limit=4')
    const data = await res.json()
    console.log(data);
    return {
      props: {
        data
      }, 
    }
  }
export default function Home({data}) {
  return (
    <>
    <Base>
    {/* <Hero /> */}
        <Box mt="5">
          <Heading as={'h2'} size="md" align={'center'}>Trouver la voiture idéale sur Auto221</Heading>
          <AdvancedSearch/>
          <Heading align={'center'}>Annonces en Vedette </Heading>
          <SimpleSlider key={data.id} data={data} />
          {/* <Heading align={'center'}>Nos dernières annonces</Heading> */}
          {/* <Info data={data}/> */}
          <Heading align={'center'} mb={'8'}>Nos services</Heading>
          <NosServices />
         {/*  <SimpleGrid columns={4} spacing={2}>
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </SimpleGrid> */}
        </Box>
        
        </Base>
      {/* <Base>
        
      </Base> */}
    </>
  );
}
