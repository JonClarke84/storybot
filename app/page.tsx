import Image from 'next/image'
import styles from './page.module.css'
import { Character } from './types/types'
import Prompt from './components/prompt'
import getCharacter from './lib/getCharacter'

export default async function Home(): Promise<JSX.Element> {
  const characters: Character = await getCharacter('Give me a json document of 5 original and uniquely named characters that have never been used before and are suitable for a childrens story with name and description fields')
  const characterList: Character[] = Object.keys(characters).map((key: string) => characters[key])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to StoryBot
        </h1>

        <Prompt characterList={characterList} />

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
