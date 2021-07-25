import { Container } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

const Base = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="100vw"  bg={'#f5f5f5'} py={5}>{children}</Container>
      <Footer />
    </>
  );
};

export default Base;
