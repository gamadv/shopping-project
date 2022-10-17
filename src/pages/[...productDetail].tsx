import {
  useCallback,
  useEffect,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { useCart } from "../context/CartContext";

import { BisMinusSquare, BisPlusSquare } from "@meronex/icons/bi/";

import { getAllProducts } from "../services/data/product-endpoint";
import { TProduct } from "../mocks/products";

import { convertToCurrency } from "../utils";
import styles from "../styles/productDetails.module.scss";

export default function ProductDetail() {
  const { query } = useRouter();
  const { handlePushToCartPage, cartData, handleChangeQuantity } = useCart();
  const [productSelected, setProductSelected] = useState<TProduct>();
  const [productNoteText, setProductNoteText] = useState("");

  const productSlug = query.productDetail;

  const getProductId = productSlug ? productSlug[1] : "";

  const { productInfoContainer, productInfoContent, infoContainer, addButton } =
    styles;


  const getProductsList = useCallback(async () => {
    if (getProductId === "") return;

    const { data: ProductList } = await getAllProducts();

    const filteredProduct = ProductList.find(
      (product) => product.id === Number(getProductId)
    );

    setProductSelected(filteredProduct);
  }, [getProductId]);

  const productQuantityUpdate = useMemo(() => {
    if (!productSelected || !cartData) return 0;

    const getItem = cartData?.find(
      (cartItem) => cartItem.id === productSelected.id
    );

    if (!getItem) return 0;

    return getItem?.quantity;
  }, [cartData, productSelected]);

  function handleGetNotesText(event: ChangeEvent<HTMLTextAreaElement>) {
    setProductNoteText(event.target.value);
  }

  useEffect(() => {
    getProductsList();
  }, [getProductsList]);

  return (
    <>
      <Head>
        <title>{productSelected?.name} | SProJX</title>
      </Head>
      <section className={productInfoContainer}>
        <div className="contentContainer">
          {productSelected ? (
            <div className={productInfoContent}>
              <Image
                src={productSelected?.imageUrl}
                alt="Procut without Image"
                width="300px"
                height="300px"
                priority
              />
              <div id={infoContainer}>
                <h2>{productSelected.name}</h2>
                <p>{productSelected.description}</p>
                <span>{convertToCurrency(productSelected.price)}</span>
                <label htmlFor="notes">Observações</label>
                <textarea
                  name="Notes"
                  id="notes"
                  rows={4}
                  cols={30}
                  value={productNoteText}
                  onChange={(event) => handleGetNotesText(event)}
                />
                <div id="quantitySelector">
                  <button
                    disabled={productQuantityUpdate === 0}
                    onClick={(event) =>
                      handleChangeQuantity(
                        event,
                        productSelected.id,
                        "Minus",
                        productNoteText
                      )
                    }
                  >
                    <BisMinusSquare size={36} color="#8758ff" />
                  </button>
                  <span>{productQuantityUpdate}</span>
                  <button
                    onClick={(event) =>
                      handleChangeQuantity(
                        event,
                        productSelected.id,
                        "Plus",
                        productNoteText
                      )
                    }
                  >
                    <BisPlusSquare size={36} color="#8758ff" />
                  </button>
                  <button className={addButton} onClick={handlePushToCartPage}>
                    Carrinho
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
