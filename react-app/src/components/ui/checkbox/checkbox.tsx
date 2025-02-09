import styles from './checkbox.module.scss'

type CheckBoxProps = {
  name: string
  value: string
  checked?: boolean
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  value,
  checked = false,
  required = false,
  onChange,
  children,
}) => {
  return (
    <div className={styles.checkbox_wrapper}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        required={required}
        onChange={onChange}
      />
      <div className={styles.label}>
        <div className={styles.custom}></div>
        <p>{children}</p>
      </div>
    </div>
  )
}

export default CheckBox
