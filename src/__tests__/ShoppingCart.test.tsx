import { ReactNode } from "react";
import { render, screen, within } from "@testing-library/react";
import ShoppingCart from "../pages/shoppingCart";
import { CartContext } from "../context/CartContext";
import { productList } from "../__mocks__/products";
import "@testing-library/jest-dom";

type TTestCartProvider = {
  children?: ReactNode;
};

const mockTotalValue = productList?.reduce(
  (accumulator, currentValue) =>
    currentValue.quantity * currentValue.price + accumulator,
  0
);

const values = {
  cartData: productList,
  cartTotalValue: "R$ 100",
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  handleChangeQuantity: jest.fn(),
  handlePushToCartPage: jest.fn(),
  handleClearCart: jest.fn(),
};

function TestCartProvider({ children }: TTestCartProvider) {
  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
}

describe("Shopping Cart", () => {
  it("should sum and quantity to be", async () => {
    render(
      <>
        <TestCartProvider>
          <ShoppingCart />
        </TestCartProvider>
      </>
    );

    const products = screen.getAllByTestId("product");

    const totalCartValue = products.reduce((accumulator, currentValue) => {
      const productPrice = within(currentValue)
        .getByTestId(`price`)
        .textContent.replaceAll(".", "")
        .replaceAll(",", ".")
        .replaceAll("R$", "")
        .replaceAll("PUnit - ","");
      const productQuantity =
        within(currentValue).getByTestId(`pquantity`).textContent;

      console.log("kiza rx", productPrice, productQuantity);
      return Number(productPrice) * Number(productQuantity) + accumulator;
    }, 0);

    expect(totalCartValue).toBe(mockTotalValue)
  });
});
