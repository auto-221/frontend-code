import { Container } from '@chakra-ui/react';
import Footer from './Footer';
import Header from './Header';

const Base = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxW="96vw">{children}</Container>
      <Footer />
    </>
  );
};

export default Base;
