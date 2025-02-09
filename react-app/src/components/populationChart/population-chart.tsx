import { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import fetchData from '../../api/api'
import styles from './population-chart.module.scss'

type PopulationData = {
  year: number
  value: number
}

type Prefecture = {
  prefCode: number
  prefName: string
}

type PopulationChartProps = {
  selectedPrefs: Prefecture[]
}

const PopulationChart: React.FC<PopulationChartProps> = ({ selectedPrefs }) => {
  const [seriesData, setSeriesData] = useState<any[]>([])

  useEffect(() => {
    const fetchPopulationData = async (pref: Prefecture) => {
      const data = await fetchData(
        `api/v1/population/composition/perYear?prefCode=${pref.prefCode}`
      )
      const populationData =
        data.result.data.find((d: any) => d.label === '総人口')?.data || []

      return {
        name: `${pref.prefName}`,
        data: populationData.map((d: PopulationData) => [d.year, d.value]),
      }
    }

    const loadPopulationData = async () => {
      const responses = await Promise.all(
        selectedPrefs.map((pref) => fetchPopulationData(pref))
      )
      setSeriesData(responses.filter((data) => data !== null))
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
    <div className={styles.graph_wrapper}>
      <h2>人口推移</h2>
      {seriesData.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>上のボタンから都道府県を選択して送信してください。</p>
      )}
    </div>
  )
}

export default PopulationChart
