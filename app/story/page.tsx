'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

const getImageFromAPI = (prompt: string): string => {
  // const response = await fetch(`/api/story?prompt=${prompt}`)
  const response = { url: '/landscape.jpeg' }
  // const data = await response.json()
  // const url: string = data.url
  const url: string = response.url
  return url
}

export default function Story() {
  const [prompt, setPrompt] = useState('test')

  useEffect(() => {
      const params = new URLSearchParams(window.location.search)
      setPrompt(params.get('prompt') || '')
  }, [])

  const image = getImageFromAPI(prompt)

  console.log('image', image)

  return (
    <div>
      <h1>Story</h1>
      <Image
        src={image}
        alt="Story Image"
        width={500}
        height={500}
      />
      <p>{prompt}</p>
    </div>
  )
}