import { NextApiRequest, NextApiResponse } from "next"
import { Story } from "../../app/types/types"

export default async function getStory(prompt: string): Promise<Story> {
  console.log('Calling api with prompt: ', prompt)
  const { Configuration, OpenAIApi } = require('openai')
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })
  const openai = new OpenAIApi(configuration)

  const responseObj: Story = {
    story: '',
    imagePrompt: '',
    imageUrl: ''
  }

    const story: Promise<NextApiResponse> = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2000,
      temperature: 0.6,
      n: 1
    }).then(async (response: any) => {
      responseObj.story = response.data.choices[0].text
      const imagePrompt: Promise<NextApiResponse> = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Create a single sentence summary of ${response.data.choices[0].text}`,
        max_tokens: 150,
        temperature: 0.6,
        n: 1
      }).then(async (imagePrompt: any) => {
        responseObj.imagePrompt = imagePrompt.data.choices[0].text
        const imageUrl: Promise<NextApiResponse> = await openai.createImage({
          prompt: `${imagePrompt.data.choices[0].text}. Children's book illustration, digital art.`,
          n: 1,
          size: '1024x1024',
        }).then((imageUrl: any) => {
          responseObj.imageUrl = imageUrl.data.data[0].url
        })
      })
    })

  console.log('Responding with: ', responseObj)
  return responseObj
}