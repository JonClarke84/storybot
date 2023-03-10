import Image from 'next/image'
import { Story, PromptDetails } from '../types/types'
import getStory from '../lib/getStory'

export default async function StorySection({ searchParams } : { searchParams: any }): Promise<JSX.Element> {
  const prompt: PromptDetails = searchParams || ''
  const data: Story = await getStory(prompt)
  const { story: generatedStory } = data

  return (
    <div>
      <h1>Story</h1>
      <Image
        src={data.imageUrl}
        alt="Story Image"
        width={500}
        height={500}
      />
      <p>{generatedStory.split('\n').map((item, key) => {
        return <span key={key}>{item}<br/></span>
      })}</p>
    </div>
  )
}
