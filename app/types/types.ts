export type Story = {
  story: string
  imagePrompt: string
  imageUrl: string
}

export type Prompt = {
  prompt: string
}

export type PromptDetails = {
  character: string,
  description: string,
  story: string,
}

export type Character = {
    [key: string]: any
    name: string
    description: string
}

export type OAImageResponse = {
  created: number
  data: Array<{
    url: string
  }>
}

export type OACompletionResponse = {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    text: string
    index: number
    logprobs: null
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}
