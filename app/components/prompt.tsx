'use client'

import { useState } from 'react'
import styles from '../page.module.css'
import { Character } from '../types/types'

export default function Prompt({ characterList }: { characterList: Character[] }): JSX.Element {
  const [characterObj, setcharacterObj] = useState<string>('')
  return (
    <>
      <form action='/story' className={styles.form}>
        <label htmlFor='character'>Choose a character:</label>
        <select name='character' className={styles.select} onChange={(e) => setcharacterObj(e.target.value)}>
          <option key={'null'} value={''}>
            -
          </option>
          {characterList.map((character: Character, index) => (
            <option key={index} value={[character.name, character.description]}>
              {character.name} - {character.description}
            </option>
          ))}
        </select>
        <textarea
          name='story'
          className={styles.textarea}
          placeholder={`Write a story for ${characterObj.split(',')[0]}...`}
        />

        <button className={styles.button} type='submit'>Generate Story</button>
      </form>
    </>
  )
}