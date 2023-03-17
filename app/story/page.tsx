export const dynamic = 'force-dynamic'
import Image from 'next/image'
import { Story, PromptDetails } from '../types/types'
import getStory from '../lib/getStory'

export default async function StorySection({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}): Promise<JSX.Element> {
  if(!searchParams) return (
    <div>
      <h1>Story</h1>
      <p>There was an error generating your story. Please try again.</p>
    </div>
  )

  const prompt = searchParams
  let data = {
    story: '',
    imageUrl: ''
  }
  if (prompt) {
    data = await getStory(prompt)
  } else throw new Error('No prompt provided')
  
  const { story: generatedStory } = data

  if(!generatedStory) return (
    <div>
      <h1>Story</h1>
      <p>There was an error generating your story. Please try again.</p>
    </div>
  )

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
