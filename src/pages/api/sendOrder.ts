import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const receiveOrder = request.body;
  const newOrder = {
    id: Date.now(),
    ...receiveOrder,
  };

  return response.status(201).json(newOrder);
}
