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
    <label>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        required={required}
        onChange={onChange}
      />
      {children}
    </label>
  )
}

export default CheckBox
