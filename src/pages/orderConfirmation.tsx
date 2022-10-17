import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { useCart } from "../context/CartContext";

import styles from "../styles/orderConfirmation.module.scss";

export default function OrderConfirmation() {
  const { push } = useRouter();
  const { handleClearCart } = useCart();

  const { orderConfirmationContainer } = styles;

  function confirmationRedirect() {
    setTimeout(() => {
      handleClearCart();
      push("/");
    }, 4000);
  }

  useEffect(() => {
    confirmationRedirect();
  });

  return (
    <>
      <Head>
        <title>Order Confirmation | SProJX</title>
      </Head>
      <section className={orderConfirmationContainer}>
        <div className="contentContainer">
          <h2>Pedido confirmado com sucesso !</h2>
        </div>
      </section>
    </>
  );
}
