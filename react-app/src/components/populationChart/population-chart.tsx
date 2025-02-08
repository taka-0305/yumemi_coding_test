import { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import fetchData from '../../api/api'

type PopulationData = {
  year: number
  value: number
}

type PopulationChartProps = {
  selectedPrefs: number[]
}

const PopulationChart: React.FC<PopulationChartProps> = ({ selectedPrefs }) => {
  const [seriesData, setSeriesData] = useState<any[]>([])

  useEffect(() => {
    const fetchPopulationData = async (prefCode: number) => {
      const data = await fetchData(
        `api/v1/population/composition/perYear?prefCode=${prefCode}`
      )
      const populationData =
        data.result.data.find((d: any) => d.label === '総人口')?.data || []

      return {
        name: `都道府県 ${prefCode}`,
        data: populationData.map((d: PopulationData) => [d.year, d.value]),
      }
    }

    const loadPopulationData = async () => {
      const responses = await Promise.all(
        selectedPrefs.map((prefCode) => fetchPopulationData(prefCode))
      )
      setSeriesData(responses.filter((data) => data !== null)) // null のデータは除外
    }

    loadPopulationData()
  }, [selectedPrefs])

  const chartOptions = {
    title: { text: '人口推移' },
    xAxis: { title: { text: '年' }, type: 'category' },
    yAxis: { title: { text: '人口数' } },
    series: seriesData,
  }

  return (
    <div>
      <h2>人口推移</h2>
      {seriesData.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>都道府県を選択して送信してください。</p>
      )}
    </div>
  )
}

export default PopulationChart
