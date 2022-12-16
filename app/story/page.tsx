'use client'

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Story from "../types/types"

export default function StorySection(): JSX.Element {
  const [text, setText] = useState('text')
  const [prompt, setPrompt] = useState('prompt default')
  const [image, setImage] = useState('/landscape.jpeg')
  const router = useRouter()

  async function getStoryFromApi (prompt: string, refresh: any): Promise<void> {
    setPrompt(prompt)
    const response = await fetch('/api/story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt)
    })
    console.log('setting text: ', text)
    return await response.json()
  }
  
  useEffect(() => {
    const prompt: any = new URLSearchParams(window.location.search).get('prompt')
    getStoryFromApi(prompt, router.refresh).then((data) => {
      console.log('data: ', data)
      setText(data.story)
      setImage(data.imageUrl)
    })
  }, [])

  return (
    <div>
      <h1>Story</h1>
      <Image
        src={image}
        alt="Story Image"
        width={500}
        height={500}
      />
      <p>Your prompt: {prompt}</p>
      <p>Your story: {text}</p>
    </div>
  )
}