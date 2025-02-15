import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PopulationChart from '../PopulationChart'
import { fetchPopulationDataAPI } from '../../../api/population'

jest.mock('../../../api/population', () => ({
  __esModule: true,
  fetchPopulationDataAPI: jest.fn(),
}))

const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森' },
]

describe('PopulationChart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetchPopulationDataAPI as jest.Mock).mockResolvedValue({
      result: {
        data: [
          { label: '総人口', data: [{ year: 2000, value: 5000000 }] },
          { label: '年少人口', data: [{ year: 2000, value: 1000000 }] },
          { label: '生産年齢人口', data: [{ year: 2000, value: 3500000 }] },
          { label: '老年人口', data: [{ year: 2000, value: 500000 }] },
        ],
      },
    })
  })

  test('renders title correctly', async () => {
    render(<PopulationChart selectedPrefs={mockPrefectures} />)

    await waitFor(() => {
      expect(screen.getByText('人口推移')).toBeInTheDocument()
    })
  })

  test('displays message when no prefecture is selected', async () => {
    render(<PopulationChart selectedPrefs={[]} />)

    await waitFor(() => {
      expect(
        screen.getByText('上のボタンから都道府県を選択して送信してください。')
      ).toBeInTheDocument()
    })
  })

  test('fetches data when prefectures are selected', async () => {
    render(<PopulationChart selectedPrefs={mockPrefectures} />)

    await waitFor(() => {
      expect(fetchPopulationDataAPI).toHaveBeenCalledTimes(
        mockPrefectures.length
      )
    })
  })

  test('updates chart when radio button is changed', async () => {
    render(<PopulationChart selectedPrefs={mockPrefectures} />)

    await waitFor(() => {
      expect(fetchPopulationDataAPI).toHaveBeenCalledTimes(
        mockPrefectures.length
      )
    })

    const youngPopulationRadio = screen.getByLabelText('年少人口')
    fireEvent.click(youngPopulationRadio)

    await waitFor(() => {
      expect(fetchPopulationDataAPI).toHaveBeenCalledTimes(
        2 * mockPrefectures.length
      )
    })
  })
})
