import type { AppProps } from "next/app";

import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}

export default MyApp;
