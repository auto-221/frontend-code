import { Box, Heading, SimpleGrid } from '@chakra-ui/layout';
import Head from 'next/head';
import Image from 'next/image';
import InfoCard from '../components/cards/InfoCard';
import Info from '../components/cards/Info';
import Hero from '../components/Hero';
import Base from '../components/layout/Base';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {getAnnonces} from '../lib/annonce';

export default function Home({data}) {
  return (
    <>
    <Base>
    <Hero />
        <Box mt="5">
          <Heading >Nos dernières annonces</Heading>
          <Info data={data}/>
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
export async function getServerSideProps()
  {
    const res = await fetch('http://localhost:1337/annonces')
    const data = await res.json()
    console.log(data);
    return {
      props: {
        data
      }, 
    }
  }