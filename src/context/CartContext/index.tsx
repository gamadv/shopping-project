import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  MouseEvent,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import { TProduct } from "../../mocks/products";

import { getAllProducts } from "../../services/data/product-endpoint";
import { convertToCurrency } from "../../utils";

interface ICartContext {
  cartData: TProduct[];
  cartTotalValue: string;
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  handleChangeQuantity: (
    event: MouseEvent<HTMLButtonElement>,
    productId: number,
    operation: string,
    notes?: string
  ) => void;
  handlePushToCartPage: () => void;
  handleClearCart: () => void;
  children?: ReactNode;
}

const CartContext = createContext({} as ICartContext);

export function CartProvider({ children }) {
  const router = useRouter();
  const [cartData, setCartData] = useState<TProduct[]>([]);

  const prevCartData = useRef<TProduct[]>();
  const prevCartValue = prevCartData.current ?? cartData;

  const cartTotalValue = useMemo(() => {
    const parseValue = cartData?.reduce(
      (accumulator, currentValue) =>
        currentValue.quantity * currentValue.price + accumulator,
      0
    );

    return convertToCurrency(parseValue, "BRL");
  }, [cartData]);

  const addToCart = async (productId: number, notes?: string) => {
    const { data } = await getAllProducts();

    const productAlreadyExists = cartData?.find(
      (product) => product.id === productId
    );

    if (productAlreadyExists) {
      const updatedCart = cartData.map((cartItem) =>
        cartItem.id === productAlreadyExists.id
          ? {
              ...cartItem,
              quantity: (cartItem.quantity += 1),
              notes: notes
            }
          : cartItem
      );

      setCartData(updatedCart);
      return;
    }

    const findProduct = data.find((product) => product.id === productId);

    const findProductchangeQuantity = {
      ...findProduct,
      quantity: 1,
    };

    if (cartData) {
      setCartData([...cartData, findProductchangeQuantity]);
    } else {
      setCartData([findProductchangeQuantity]);
    }
  };

  const removeFromCart = (productId: number) => {
    const productAlreadyExists = cartData?.find(
      (product) => product.id === productId
    );

    if (productAlreadyExists.quantity > 1) {
      const updatedCart = cartData.map((cartItem) =>
        cartItem.id === productAlreadyExists.id
          ? {
              ...cartItem,
              quantity: (cartItem.quantity -= 1),
            }
          : cartItem
      );

      setCartData(updatedCart);

      return;
    }
    const cartWithouItem = cartData.filter(
      (product) => product.id !== productId
    );
    setCartData(cartWithouItem);
  };
 

  const handleChangeQuantity = (
    event: MouseEvent<HTMLButtonElement>,
    productId: number,
    operation: string,
    notes?: string
  ) => {
    event.stopPropagation();

    if (operation === "Minus") {
      removeFromCart(productId);
      return;
    }
    if (operation === "Plus") {
      addToCart(productId, notes);
      return;
    }
  };

  const handleClearCart = () => {
    setCartData([]);
  }

  const handlePushToCartPage = () => {
    router.push("/shoppingCart");
  };

  useEffect(() => {
    const storagedCart = localStorage.getItem("@ShoppingProjx:cart");

    if (storagedCart) {
      setCartData(JSON.parse(storagedCart));
    }
  }, []);

  useEffect(() => {
    prevCartData.current = cartData;
  });

  useEffect(() => {
    if (prevCartValue !== cartData) {
      localStorage.setItem("@ShoppingProjx:cart", JSON.stringify(cartData));
    }
    prevCartData.current = cartData;
  }, [cartData, prevCartValue]);

  const values = {
    cartData,
    cartTotalValue,
    addToCart,
    removeFromCart,
    handleChangeQuantity,
    handlePushToCartPage,
    handleClearCart
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  return useContext(CartContext);
};
