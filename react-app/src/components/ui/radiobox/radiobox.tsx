// components/ui/radiobox/RadioBox.tsx
import styles from './radiobox.module.scss'

type RadioBoxProps = {
  name: string
  value: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}

const RadioBox: React.FC<RadioBoxProps> = ({
  name,
  value,
  checked,
  onChange,
  children,
}) => {
  return (
    <label className={styles.radio}>
      <input
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
