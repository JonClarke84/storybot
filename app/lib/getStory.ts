import { NextApiResponse } from 'next'
import {
  Story,
  OACompletionResponse,
  OAImageResponse,
} from '../../app/types/types'

export default async function getStory(prompt: any = { character: { name: 'Dave', description: 'Lovely man' } } ): Promise<Story> {
  const responseObj: Story = {
    story: '',
    imagePrompt: '',
    imageUrl: '',
  }
  if(!prompt) return responseObj

  const { character, story } = prompt
  const { name, description } = JSON.parse(character)
  console.log('prompt: ', prompt)
  
  console.log(`Once upon a time, there was someone called ${name}. ${description}. ${story}`)

  const { Configuration, OpenAIApi } = require('openai')
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  async function textCompletion(): Promise<string> {
    const response: OACompletionResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are a master storyteller, specialising in children's stories."},
        {role: "user", content: "You are a master storyteller, specialising in children's stories."},
        {role: "user", content: `Once upon a time, there was someone called ${name}. ${description}. The prompt is: ${story}`},
        {role: "assistant", content: "Ok, what should I do next?"},
        {role: "user", content: "Write a children's story based on the prompt. It should be educational with a positive message. Please just go straight into the story, don't introduce it. The story should have three chapters, a set up, a middle with a challenge and a triumphant third chapter where the character overcomes difficulty and goes through some personal growth."},
      ],
    })
    return response.data.choices[0].message.content as string
  }

  const storyResponse: string = await textCompletion()
  responseObj.story = storyResponse
  console.log('storyResponse: ', storyResponse)

  async function imagePromptCompletion(): Promise<string> {
    const response: OACompletionResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {role: "system", content: "You are an expert AI engineer, who creates masterful prompts for generative image AIs."},
        {role: "user", content: "You are an expert AI engineer, who creates masterful prompts for generative image AIs."},
        {role: "user", content: "You are going to create an image prompt for a image generative diffusion AI."},
        {role: "assistant", content: "Ok"},
        {role: "user", content: `The character is ${name}. ${description}. The story is: ${story}`},
        {role: "assistant", content: "Ok"},
        {role: "user", content: "Your prompt is going to include some the setting/background and action the story"},
        {role: "assistant", content: "Ok"},
        {role: "user", content: `Create an image prompt of the main character in situ. No more than 30 words. Then add the following EXACT list of words, no changes1: Digital art, pastel colours, beautiful brushstrokes, magical, whimsical`},
      ],
    })
    return response.data.choices[0].message.content as string
  }

  const imagePrompt: string = await imagePromptCompletion()
  responseObj.imagePrompt = imagePrompt
  console.log('IMAGE PROMPT: ', imagePrompt)

  const imageUrl = await openai.createImage({
      prompt: imagePrompt,
      n: 1,
      size: '1024x1024',
    })
  console.log('IMAGE URL: ', imageUrl.data.data[0].url)
  responseObj.imageUrl = imageUrl.data.data[0].url

  return responseObj
}
