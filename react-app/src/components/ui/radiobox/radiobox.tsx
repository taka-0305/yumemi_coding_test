// components/ui/radiobox/RadioBox.tsx
import styles from './radiobox.module.scss'
import { ReactNode, FC, ChangeEvent } from 'react'
type RadioBoxProps = {
  name: string
  value: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
}

const RadioBox: FC<RadioBoxProps> = ({
  name,
  value,
  checked,
  onChange,
  children,
}) => {
  return (
    <label className={styles.radio} htmlFor={`radio-${name}-${children}`}>
      <input
        id={`radio-${name}-${children}`}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.name}>{children}</span>
    </label>
  )
}

export default RadioBox
