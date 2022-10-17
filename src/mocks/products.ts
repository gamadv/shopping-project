export type TProduct = {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity?: number;
  notes?: string;
};

export const productList = [
  {
    id: 1,
    name: "Ingresso: Republica do Reggae",
    price: 109.99,
    description: "Show ocorrerá em Salvador, WET.",
    imageUrl:
      "https://toppng.com/uploads/preview/shopping-cart-115309972353g1kktalus.png",
    quantity: 0,
  },
  {
    id: 2,
    name: "Ingresso: Cinemark (Gift)",
    price: 29.99,
    description: "Gift Card do Cinemark para presentear a quem você desejar.",
    imageUrl:
      "https://toppng.com/uploads/preview/shopping-cart-115309972353g1kktalus.png",
    quantity: 0,
  },
  {
    id: 3,
    name: "Balde UCI Special",
    price: 39.99,
    description: "Aproveite o melhor dos filmes com mais pipoca!",
    imageUrl:
      "https://toppng.com/uploads/preview/shopping-cart-115309972353g1kktalus.png",
    quantity: 0,
  },
  {
    id: 4,
    name: "Camisa Tricolor de Aço",
    price: 209.99,
    description: "Torça com uniforme atualizado",
    imageUrl:
      "https://toppng.com/uploads/preview/shopping-cart-115309972353g1kktalus.png",
    quantity: 0,
  },
  {
    id: 5,
    name: "Pelúcia bolofofos",
    price: 1009.99,
    description: "Leve seu desenho favorito com você",
    imageUrl:
      "https://toppng.com/uploads/preview/shopping-cart-115309972353g1kktalus.png",
    quantity: 0,
  },
  {
    id: 6,
    name: "Heineken ZERO",
    price: 6.99,
    description: "Curta da mesma forma, só que pior",
    imageUrl:
      "https://toppng.com/uploads/preview/shopping-cart-115309972353g1kktalus.png",
    quantity: 0,
  },
];
