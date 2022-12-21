import Image from 'next/image'
import { Story, Prompt } from '../types/types'
import getStory from '../lib/getStory'

export default async function StorySection({
  searchParams,
}: {
  searchParams: Prompt
}): Promise<JSX.Element> {
  const prompt: Prompt = searchParams || ''
  const data: Story = await getStory(prompt.prompt)

  return (
    <div>
      <h1>Story</h1>
      <Image
        src={data.imageUrl}
        // src={'/landscape.jpeg'}
        alt="Story Image"
        width={500}
        height={500}
      />
      <p>Your prompt: {prompt.prompt}</p>
      <p>Your story: {data.story}</p>
    </div>
  )
}
