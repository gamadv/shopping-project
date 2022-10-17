// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { TProduct, productList } from '../../mocks/products';


export default function handler(
  request: NextApiRequest,
  response: NextApiResponse<TProduct[]>
) {
  return response.status(200).json(productList);
}
