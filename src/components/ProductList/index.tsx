import React from "react";

import { TProduct } from "../../mocks/products";
import { ProductItem } from "../ProductItem";

import { SkeletonContent } from "./SkeletonContent";

import styles from "./styles.module.scss";

type TProductList = {
  products: TProduct[];
  isLoading?: boolean;
};

export function ProductList({ products, isLoading }: TProductList) {
  const { productListContainer } = styles;

  return (
    <section className={productListContainer}>
      <div className="contentContainer">
        {isLoading ? (
          <SkeletonContent products={products} />
        ) : (
          <>
            <ul>
              {products.map((product) => (
                <ProductItem product={product} key={product.id} />
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
