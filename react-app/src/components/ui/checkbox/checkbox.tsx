import styles from './checkbox.module.scss'
import { ReactNode, FC, ChangeEvent } from 'react'

type CheckBoxProps = {
  name: string
  value: string
  checked?: boolean
  required?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  children: ReactNode
}

const CheckBox: FC<CheckBoxProps> = ({
  name,
  value,
  checked = false,
  required = false,
  onChange,
  children,
}) => {
  return (
    <label className={styles.checkbox_wrapper}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        required={required}
        onChange={onChange || (() => {})}
      />
      <div className={styles.label}>
        <div className={styles.custom}></div>
        <p>{children}</p>
      </div>
    </label>
  )
}

export default CheckBox
