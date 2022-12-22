import { NextApiResponse } from 'next'
import {
  Story,
  OACompletionResponse,
  OAImageResponse,
} from '../../app/types/types'

export default async function getStory(prompt: string): Promise<Story> {
  console.log('Calling api with prompt: ', prompt)
  const { Configuration, OpenAIApi } = require('openai')
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const responseObj: Story = {
    story: '',
    imagePrompt: '',
    imageUrl: '',
  }

  const { data: storyData }: Promise<NextApiResponse<OACompletionResponse>> =
    await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 2000,
      temperature: 0.6,
      n: 1,
    })
  responseObj.story = storyData.choices[0].text

  const {
    data: imagePromptData,
  }: Promise<NextApiResponse<OACompletionResponse>> =
    await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Create a single sentence summary of ${storyData.choices[0].text}`,
      max_tokens: 150,
      temperature: 0.6,
      n: 1,
    })
  responseObj.imagePrompt = imagePromptData.choices[0].text

  const { data: imageUrlData }: Promise<NextApiResponse<OAImageResponse>> =
    await openai.createImage({
      prompt: `${imagePromptData.choices[0].text}. Children's book illustration, digital art.`,
      n: 1,
      size: '512x512',
    })
  responseObj.imageUrl = imageUrlData.data[0].url

  return responseObj
}
