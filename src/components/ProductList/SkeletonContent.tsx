import React from "react";
import Skeleton from "react-loading-skeleton";
import { TProduct } from "../../mocks/products";

import styles from "./styles.module.scss";

type TSkeletonContent = {
  products: TProduct[];
};

export function SkeletonContent({ products }: TSkeletonContent) {
  const { SkeletonArticle, SkeletonListItem } = styles;

  return (
    <>
      <ul>
        {products?.map((product) => {
          return (
            <li key={product.id} className={SkeletonListItem}>
              <article className={SkeletonArticle}>
                <Skeleton
                  baseColor="#fff"
                  width="60px"
                  height="60px"
                  style={{ opacity: 0.3 }}
                />
                <div>
                  <Skeleton
                    baseColor="#8758ff"
                    width="330px"
                    height="10px"
                    style={{ opacity: 0.3, borderRadius: "25px", marginTop: "1rem" }}
                  />
                  <Skeleton
                    baseColor="#8758ff"
                    width="330px"
                    height="10px"
                    style={{ opacity: 0.3, borderRadius: "25px" }}
                  />
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  );
}
