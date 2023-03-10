import styles from '../page.module.css'
import { Character } from '../types/types'

export default function ChooseCharacter({ characterList }: { characterList: Character[] }): JSX.Element {
  return (
    <>
      <label htmlFor='character'>Choose a character:</label>
      <select name='character' className={styles.select}>
        <option key={'null'} value={''}>
          Choose a character
        </option>
        {characterList.map((character: Character, index) => (
          <>
          <option key={index} value={JSON.stringify(character)}>
            {character.name} - {character.description}
          </option>
          </>
        ))}
      </select>
    </>
  )
}
