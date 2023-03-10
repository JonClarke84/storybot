'use client'

import { useState } from 'react'
import { Character } from '../types/types'
import styles from '../page.module.css'
import ChooseCharacter from './chooseCharacter'
import CreateCharacter from './createCharacter'

export default function Prompt({ characterList }: { characterList: Character[] }): JSX.Element {
  const [showChooseCharacter, setShowChooseCharacter] = useState<boolean>(false)
  const [showCreateCharacter, setShowCreateCharacter] = useState<boolean>(false)

  function handleChooseCharacter(): void {
    setShowCreateCharacter(false)
    setShowChooseCharacter(true)
  }

  function handleCreateCharacter(): void {
    setShowChooseCharacter(false)
    setShowCreateCharacter(true)
  }


  return (
    <div>
      { (!showChooseCharacter && !showCreateCharacter) &&
      <>
        <button className={styles.button} onClick={handleChooseCharacter}>Choose A Character</button>
        {/* <button className={styles.button} onClick={handleCreateCharacter}>Create A Character</button> */}
      </>
      }
      <form action='/story' className='form'>
      { showChooseCharacter && <ChooseCharacter characterList={characterList} /> }
      { showCreateCharacter && <CreateCharacter /> }
      { (showChooseCharacter || showCreateCharacter) &&
      <>
        <textarea
          name='story'
          className={styles.textarea}
          placeholder={`Write your story prompt here...`}
        /> 
        <button className={styles.button} type='submit'>Generate Story</button>
      </>
      }
      </form>
    </div>
  )
}
