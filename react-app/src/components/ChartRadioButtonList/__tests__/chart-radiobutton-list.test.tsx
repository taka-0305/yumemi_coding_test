import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChartRadioButtonList from '../ChartRadioButtonList'

describe('ChartRadioButtonList Component', () => {
  test('renders all radio buttons', () => {
    render(
      <ChartRadioButtonList
        selectedLabel="総人口"
        setSelectedLabel={() => {}}
      />
    )
    expect(screen.getByLabelText('総人口')).toBeInTheDocument()
    expect(screen.getByLabelText('年少人口')).toBeInTheDocument()
    expect(screen.getByLabelText('生産年齢人口')).toBeInTheDocument()
    expect(screen.getByLabelText('老年人口')).toBeInTheDocument()
  })

  test('calls setSelectedLabel when a radio button is clicked', () => {
    const setSelectedLabelMock = jest.fn()
    render(
      <ChartRadioButtonList
        selectedLabel="総人口"
        setSelectedLabel={setSelectedLabelMock}
      />
    )

    const youngPopulationRadio = screen.getByLabelText('年少人口')
    fireEvent.click(youngPopulationRadio)

    expect(setSelectedLabelMock).toHaveBeenCalledWith('年少人口')
  })
})
