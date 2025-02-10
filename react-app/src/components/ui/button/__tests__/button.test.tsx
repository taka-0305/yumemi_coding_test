import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../button'

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>クリック</Button>)
    expect(screen.getByText('クリック')).toBeInTheDocument()
  })

  it('triggers click event', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>クリック</Button>)

    fireEvent.click(screen.getByText('クリック'))
    expect(handleClick).toHaveBeenCalled()
  })
})
