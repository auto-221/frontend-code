/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Box, Heading } from '@chakra-ui/layout';
import SimpleSlider from '../components/cards/Slider';
import Base from '../components/layout/Base';
// import styles from '../styles/Home.module.css';
import AdvancedSearch from '../components/AdvancedSearch';
import NosServices from '../components/NosServices';

let modele = [];

async function setMarque(data) {

  for (let index = 0; index < data.length; index++) {
    const marqueRequest = await fetch(
      'http://localhost:1337/modeles/' + data[index].voiture.modele
    );
    modele.push(await marqueRequest.json());
  }
  for (let i = 0; i < data.length; i++) {
    data[i]['modele'] = modele[i];
  }
  return data;
 
}

export async function getServerSideProps() {
  const res = await fetch('http://localhost:1337/annonces?_limit=4');
  let data = await res.json();
  data = await setMarque(data);
  console.log(data);
  return {
    props: {
      data
    }
  };
}
export default function Home({ data }) {
  return (
    <>
      <Base>
        {/* <Hero /> */}
        <Box mt="5">
          <Heading as={'h3'} size="md" align={'center'}>
            Trouver la voiture idéale sur Auto221
          </Heading>
          <AdvancedSearch />
          <Heading as={'h2'} size="md" align={'center'} mt={'14'}>
            Annonces en Vedette{' '}
          </Heading>
          <SimpleSlider key={data.id} data={data} />
          {/* <Heading align={'center'}>Nos dernières annonces</Heading> */}
          {/* <Info data={data}/> */}
          <Heading as={'h2'} size="md" align={'center'} mb={'8'}>
            Nos services
          </Heading>
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
