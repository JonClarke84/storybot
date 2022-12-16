import { NextApiRequest, NextApiResponse } from "next"
import Story from "../../app/types/types"

export default async function data(req: NextApiRequest, res: NextApiResponse) {
  
  console.log('req.body: ', req.body)

  const response: string = 'this is a story'
  console.log('response: ', response)
  res.status(200).json(response)
}