import styles from './button.module.scss'
import { ReactNode, FC } from 'react'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
      <span className={styles.shadow}></span>
      <span className={styles.edge}></span>
      <span className={`${styles.front} ${styles.text}`}>{children}</span>
    </button>
  )
}

export default Button
