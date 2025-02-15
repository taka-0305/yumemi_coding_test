import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import PrefectureForm from '../PrefectureForm'
import { fetchPrefecturesDataAPI } from '../../../api/prefectures'
jest.mock('../../../api/prefectures', () => ({
  __esModule: true,
  fetchPrefecturesDataAPI: jest.fn(),
}))

describe('PrefectureForm Component', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 13, prefName: '東京都' },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetchPrefecturesDataAPI as jest.Mock).mockResolvedValue(mockPrefectures)
  })

  it('renders the form correctly', async () => {
    render(<PrefectureForm onSubmit={jest.fn()} />)

    await waitFor(() => {
      expect(screen.getByText('都道府県を選択する')).toBeInTheDocument()
      expect(
        screen.getByText('グラフに表示する都道府県を選択してください。')
      ).toBeInTheDocument()
    })
  })

  it('fetches and displays prefectures', async () => {
    render(<PrefectureForm onSubmit={jest.fn()} />)

    await waitFor(() => {
      expect(screen.getByLabelText('北海道')).toBeInTheDocument()
      expect(screen.getByLabelText('東京都')).toBeInTheDocument()
    })
  })

  it('submits selected prefectures', async () => {
    const mockOnSubmit = jest.fn()
    render(<PrefectureForm onSubmit={mockOnSubmit} />)

    await waitFor(() => screen.getByLabelText('北海道'))
    fireEvent.click(screen.getByLabelText('北海道'))

    fireEvent.click(screen.getByText('グラフを表示する'))

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith([
        { prefCode: 1, prefName: '北海道' },
      ])
    })
  })
})
