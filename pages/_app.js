import '../styles/globals.css';
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
const theme = extendTheme({
  colors: {
    mycolor: {
     
      100: "#ff7143",
      500: "#ff7143", // you need this
    }
  }
});
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
