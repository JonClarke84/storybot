import { NextApiResponse } from 'next'
import {
  Story,
  OACompletionResponse,
  OAImageResponse,
} from '../../app/types/types'

export default async function getStory(prompt: any): Promise<Story> {
  const { character, story } = prompt
  const { name, description } = JSON.parse(character)
  console.log('prompt: ', prompt)
  
  console.log(`Once upon a time, there was someone called ${name}. ${description}. ${story}`)

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

  const textCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "You are a master storyteller, specialising in children's stories."},
      {role: "user", content: "You are a master storyteller, specialising in children's stories."},
      {role: "user", content: `Once upon a time, there was someone called ${name}. ${description}. The prompt is: ${story}`},
      {role: "assistant", content: "Ok, what should I do next?"},
      {role: "user", content: "Write a children's story based on the prompt. Please just go straight into the story, don't introduce it."},
    ],
  })

  responseObj.story = textCompletion.data.choices[0].message.content
  console.log('Text completion: ', story, textCompletion.data.choices[0].message.content)

  const imagePromptCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {role: "system", content: "You are an expert AI engineer, who creates masterful prompts for generative image AIs."},
      {role: "user", content: "You are an expert AI engineer, who creates masterful prompts for generative image AIs."},
      {role: "user", content: `Generate an image prompt for the story: ${textCompletion.data.choices[0].message.content}. A single sentence is enough. No more than 50 words.`},
    ],
  })

  responseObj.imagePrompt = imagePromptCompletion.data.choices[0].message.content
  console.log('IMAGE PROMPT: ', imagePromptCompletion.data.choices[0].message.content)

  const imageUrl = await openai.createImage({
      prompt: `${imagePromptCompletion.data.choices[0].message.content}. Watercolour, pastel colours, beautiful brushstrokes, magical, whimsical.`,
      n: 1,
      size: '1024x1024',
    })
  console.log('IMAGE URL: ', imageUrl.data.data[0].url)
  responseObj.imageUrl = imageUrl.data.data[0].url

  return responseObj
}
