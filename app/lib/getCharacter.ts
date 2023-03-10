import { NextApiResponse } from 'next'
import {
  Character,
  OACompletionResponse,
} from '../types/types'

export default async function getCharacter(prompt: string): Promise<Character> {
  console.log('Reqesting characters with prompt: ', prompt)
  const { Configuration, OpenAIApi } = require('openai')
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const { data: characterData } =
  await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 3000,
    temperature: 0.9,
    n: 1,
  })

  const response: string = characterData.choices[0].text
  const responseJson: Character = JSON.parse(response)
  return responseJson
}