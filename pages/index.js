import { Box, Heading, SimpleGrid } from '@chakra-ui/layout';
import Head from 'next/head';
import Image from 'next/image';
import InfoCard from '../components/cards/InfoCard';
import Hero from '../components/Hero';
import Base from '../components/layout/Base';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Base>
        <Link href="/contact">Aller ssur la page contact</Link>
        <Hero />
        <Box mt="5">
          <Heading>Nos dérniéres annonces</Heading>
          <SimpleGrid columns={4} spacing={2}>
            <InfoCard />
            <InfoCard />
            <InfoCard />
            <InfoCard />
          </SimpleGrid>
        </Box>
      </Base>
    </>
  );
}
