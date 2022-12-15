import styles from '../page.module.css'

export default function Prompt(): JSX.Element {
  return (
    <>
      <form action='/story' className={styles.form}>
        <textarea
          name='prompt'
          className={styles.textarea}
          placeholder="Enter your story prompt here"
        />

        <button className={styles.button} type='submit'>Generate Story</button>
      </form>
    </>
  )
}