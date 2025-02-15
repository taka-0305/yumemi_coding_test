import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import PopulationChart from '../population-chart'
import fetchData from '../../../api/fetchClient'

jest.mock('../../../api/api', () => ({
  __esModule: true,
  default: jest.fn(),
}))

const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森' },
]

const mockedFetchData = fetchData as jest.Mock

describe('PopulationChart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders title correctly', () => {
    render(<PopulationChart selectedPrefs={[]} />)
    expect(screen.getByText('人口推移')).toBeInTheDocument()
  })

  test('displays message when no prefecture is selected', () => {
    render(<PopulationChart selectedPrefs={[]} />)
    expect(
      screen.getByText('上のボタンから都道府県を選択して送信してください。')
    ).toBeInTheDocument()
  })

  test('fetches data when prefectures are selected', async () => {
    mockedFetchData.mockResolvedValue({
      result: {
        data: [
          {
            label: '総人口',
            data: [
              { year: 2000, value: 5000000 },
              { year: 2010, value: 4800000 },
            ],
          },
        ],
      },
    })

    await act(async () => {
      render(<PopulationChart selectedPrefs={mockPrefectures} />)
    })

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledTimes(mockPrefectures.length)
    })
  })

  test('updates chart when radio button is changed', async () => {
    mockedFetchData.mockResolvedValue({
      result: {
        data: [
          { label: '総人口', data: [{ year: 2000, value: 5000000 }] },
          { label: '年少人口', data: [{ year: 2000, value: 1000000 }] },
        ],
      },
    })

    await act(async () => {
      render(<PopulationChart selectedPrefs={mockPrefectures} />)
    })
    await waitFor(() =>
      expect(fetchData).toHaveBeenCalledTimes(mockPrefectures.length)
    )

    const youngPopulationRadio = screen.getByLabelText('年少人口')
    await act(async () => {
      fireEvent.click(youngPopulationRadio)
    })

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledTimes(mockPrefectures.length * 2)
    })
  })
})
