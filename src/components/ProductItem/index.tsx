import { MouseEvent, useMemo } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { BisMinusSquare, BisPlusSquare } from "@meronex/icons/bi/";
import { useCart } from "../../context/CartContext";
import { TProduct } from "../../mocks/products";

import { convertToCurrency } from "../../utils";

import styles from "./styles.module.scss";

type TProductItem = {
  product: TProduct;
  hasQuantitySelector?: boolean;
  isCartPage?: boolean;
};
export function ProductItem({
  product,
  hasQuantitySelector,
  isCartPage,
}: TProductItem) {
  const router = useRouter();
  const { cartData, handleChangeQuantity } = useCart();
  const { id, name, price, imageUrl, quantity } = product;
  const { productListItemContainer, totalContainer } = styles;

  const productValue = isCartPage
    ? convertToCurrency(price * quantity, "BRL")
    : convertToCurrency(price, "BRL");

  const productQuantityUpdate = useMemo(() => {
    if (!product || !cartData) return 0;

    const getItem = cartData?.find((cartItem) => cartItem.id === id);

    if (!getItem) return 0;

    return getItem?.quantity;
  }, [cartData, id, product]);

  function handlePageToProductDetail(
    event: MouseEvent<HTMLLIElement>,
    id: number
  ) {
    event.preventDefault();
    router.push(`/productDetail`);
  }

  return (
    <li
      data-testid={`product`}
      className={productListItemContainer}
      onClick={(event) => handlePageToProductDetail(event, id)}
    >
      <article>
        <Image
          src={imageUrl}
          alt="Procut without Image"
          width="60px"
          height="60px"
        />
        <div>
          <p>{name}</p>
          <span data-testid={`price`}>P.Unit - {convertToCurrency(price)}</span>
        </div>
        {hasQuantitySelector && (
          <div id="quantitySelector">
            <button
              onClick={(event) => handleChangeQuantity(event, id, "Minus")}
            >
              <BisMinusSquare size={34} color="#8758ff" />
            </button>
            <span data-testid={`pquantity`}>{productQuantityUpdate}</span>
            <button
              onClick={(event) => handleChangeQuantity(event, id, "Plus")}
            >
              <BisPlusSquare size={34} color="#8758ff" />
            </button>
          </div>
        )}
        {quantity > 0 && (
          <div data-testid={`ptotal`} className={totalContainer}>
            <p>Total</p> {productValue}
          </div>
        )}
      </article>
    </li>
  );
}
