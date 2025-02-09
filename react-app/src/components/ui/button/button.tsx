import styles from './button.module.scss'

type ButtonProps = {
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return (
    <button className={styles.button} type="submit">
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={`${styles.front} ${styles.text}`}>{children}</span>
    </button>
  )
}

export default Button
