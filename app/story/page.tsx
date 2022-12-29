import Image from 'next/image'
import { Story, PromptDetails } from '../types/types'
import getStory from '../lib/getStory'

export default async function StorySection({
  searchParams,
}: {
  searchParams: PromptDetails
}): Promise<JSX.Element> {
  const promptDetails: PromptDetails = searchParams || ''
  const { character, story } = promptDetails
  const [ characterName, characterDescription ] = character.split(',')

  const data: Story = await getStory(`Tell me a children's story about ${characterName}, ${characterDescription}. ${story}`)

  return (
    <div>
      <h1>Story</h1>
      <Image
        src={data.imageUrl}
        alt="Story Image"
        width={500}
        height={500}
      />
      <p>Your story: {data.story}</p>
    </div>
  )
}
