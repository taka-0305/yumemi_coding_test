import { render, screen, fireEvent } from '@testing-library/react'
import CheckBox from '../checkbox'

describe('CheckBox Component', () => {
  it('renders correctly', () => {
    render(
      <CheckBox name="prefecture" value="1">
        北海道
      </CheckBox>
    )
    expect(screen.getByText('北海道')).toBeInTheDocument()
  })

  it('toggles checked state', () => {
    const handleChange = jest.fn()

    render(
      <CheckBox
        name="prefecture"
        value="1"
        checked={false}
        onChange={handleChange}
      >
        北海道
      </CheckBox>
    )

    const checkbox = screen.getByLabelText('北海道')
    fireEvent.click(checkbox)
    expect(handleChange).toHaveBeenCalled()
  })
})
