import { NextApiRequest, NextApiResponse } from "next"

export default async function data(req: NextApiRequest, res: NextApiResponse) {
  res.json({
    ...req.body
  })
}