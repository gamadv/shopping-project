import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { EnShoppingCart } from "@meronex/icons/en/";
import { BisCart } from "@meronex/icons/bi/";
import { IosArrowRoundBack } from "@meronex/icons/ios/";

import { useCart } from "../../context/CartContext";

import styles from "./styles.module.scss";

export function Header() {
  const { pathname, back } = useRouter();
  const { cartData, handlePushToCartPage, cartTotalValue } = useCart();
  const [windowScroll, setWindowScroll] = useState(0);
  
  const { headerContainer, cartAnimation, scrollClass } = styles;

  const hasCart = cartData?.length > 0;

  const hasBackButton = pathname != "/" ? true : false;

  const hasWindowScrolled = windowScroll > 200;

  const headerClasses = hasWindowScrolled
    ? [headerContainer, scrollClass].join(" ")
    : headerContainer;

  function handleBackButton() {
    back();
  }

  const watchWindowScroll = useCallback(() => {
    window.addEventListener("scroll", () => {
      setWindowScroll(window.scrollY);
    }),
      [setWindowScroll];
  }, []);

  useEffect(() => {
    watchWindowScroll();
  }, [watchWindowScroll]);

  return (
    <header className={headerClasses}>
      <section className="contentContainer">
        {hasBackButton && (
          <button onClick={handleBackButton}>
            <IosArrowRoundBack size={48} color="#8758FF" />
          </button>
        )}
        <div>
          <Link href="/">
            <a>
              <EnShoppingCart size={68} color="#8758FF" />
              <p>Shopping ProJX</p>
            </a>
          </Link>
        </div>
        <button
          className={hasCart ? cartAnimation : null}
          onClick={handlePushToCartPage}
        >
          {hasCart && (
            <>
              <span>{cartTotalValue}</span>
              <span>{cartData.length}</span>
            </>
          )}
          <BisCart size={48} color="#8758FF" />
        </button>
      </section>
    </header>
  );
}
