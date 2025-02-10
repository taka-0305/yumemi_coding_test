import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import RadioBox from '../radiobox'
describe('RadioBox Component', () => {
  test('renders children correctly', () => {
    render(
      <RadioBox name="test" value="option1" checked={false} onChange={() => {}}>
        Test Option
      </RadioBox>
    )
    expect(screen.getByText('Test Option')).toBeInTheDocument()
  })

  test('triggers onChange when clicked', () => {
    const onChangeMock = jest.fn()
    render(
      <RadioBox
        name="test"
        value="option1"
        checked={false}
        onChange={onChangeMock}
      >
        Test Option
      </RadioBox>
    )

    const radioInput = screen.getByLabelText('Test Option')
    fireEvent.click(radioInput)
    expect(onChangeMock).toHaveBeenCalled()
  })
})
