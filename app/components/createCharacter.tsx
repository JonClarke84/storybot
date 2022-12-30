import styles from '../page.module.css'

export default function CreateCharacter(): JSX.Element {
  return (
    <div>
        <label htmlFor='character'>Character Name:</label>
        <input type='text' name='character' className={styles.input} />
        < br />
        <label htmlFor='description'>Character Description:</label>
        <input type='text' name='description' className={styles.input} />
    </div>
  )
}
