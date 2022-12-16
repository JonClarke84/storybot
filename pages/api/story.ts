import { NextApiRequest, NextApiResponse } from "next"

export default async function data(req: NextApiRequest, res: NextApiResponse) {
  const { Configuration, OpenAIApi } = require('openai')
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
  const openai = new OpenAIApi(configuration)

  const responseObj: any = {}

  const story = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body,
    max_tokens: 2000,
    temperature: 0.6,
    n: 1
  }).then(async (response: any) => {
    responseObj.story = response.data.choices[0].text
    const imagePrompt = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Create a single sentence summary of ${response.data.choices[0].text}`,
      max_tokens: 150,
      temperature: 0.6,
      n: 1
    }).then(async (imagePrompt: any) => {
      responseObj.imagePrompt = imagePrompt.data.choices[0].text
      const imageUrl = await openai.createImage({
        prompt: `${imagePrompt.data.choices[0].text}. Children's book illustration, digital art.`,
        n: 1,
        size: '1024x1024',
      }).then((imageUrl: any) => {
        responseObj.imageUrl = imageUrl.data.data[0].url
      })
    })
  })

  console.log('Response object: ', responseObj)
  res.json(responseObj)
}