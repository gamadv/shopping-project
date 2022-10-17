import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { ProductItem } from "../components/ProductItem";
import { useCart } from "../context/CartContext";
import { postOrder } from "../services/data/product-endpoint";

import styles from "../styles/shoppingCart.module.scss";

export default function ShoppingCart() {
  const { push } = useRouter();
  const { cartData, cartTotalValue } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const { emptyCart, cartContent } = styles;

  const hasCart = cartData?.length > 0;

  async function handleSubmit() {
    setIsLoading(true);
    const order = {
      total: cartTotalValue,
      items: [...cartData],
    };

    const { data } = await postOrder(order);
    console.log(order, data);

    setTimeout(() => {
      push('/orderConfirmation')
      setIsLoading(false);
    }, 2000);
  }

  return (
    <>
      <Head>
        <title>Cart | SProJX</title>
      </Head>
      <div>
        <section className="contentContainer">
          {hasCart ? (
            <div className={cartContent}>
              <ul>
                {cartData.map((cartItem) => (
                  <ProductItem
                    key={cartItem.id}
                    product={cartItem}
                    hasQuantitySelector
                    isCartPage
                  />
                ))}
              </ul>
              <footer>
                <div>
                  <p>Total</p>
                  <span>{cartTotalValue}</span>
                </div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <button disabled={!hasCart} onClick={handleSubmit}>
                    Enviar Pedido
                  </button>
                )}
              </footer>
            </div>
          ) : (
            <div className={emptyCart}>
              <h2>Seu carrinho está vazio :( </h2>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
