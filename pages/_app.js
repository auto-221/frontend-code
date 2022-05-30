/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import '../styles/globals.css';
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme"
import NProgress from 'nprogress';
import "nprogress/nprogress.css";
import Router from 'next/router';
// const theme = extendTheme({
//   colors: {
//     mycolor: {
     
//       100: "#ff7143",
//       500: "#ff7143", // you need this
//     }
//   }
// });

NProgress.configure({
  minimum: 0.3,
  easing: 'ease',
  speed: 800,
  showSpinner: false,
});

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS={true} theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
