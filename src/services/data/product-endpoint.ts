import { TProduct } from "../../mocks/products";
import { api } from "../api";

export function getAllProducts() {
  return api.get<TProduct[]>("/productList");
}
export function postOrder(orderReceived: Object) {
  return api.post<TProduct[]>("/sendOrder", {
    orderReceived,
  });
}
