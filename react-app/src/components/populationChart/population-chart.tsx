import { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import fetchData from '../../api/api'
import styles from './population-chart.module.scss'
import ChartRadioButtonList from '../ChartRadioButtonList/chart-radiobutton-list'

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
  const [selectedLabel, setSelectedLabel] = useState('総人口')

  useEffect(() => {
    const fetchPopulationData = async (pref: Prefecture) => {
      const data = await fetchData(
        `api/v1/population/composition/perYear?prefCode=${pref.prefCode}`
      )
      const populationData =
        data.result.data.find((d: any) => d.label === selectedLabel)?.data || []

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
  }, [selectedPrefs, selectedLabel])

  const chartOptions = {
    title: {
      text: selectedLabel + '推移',
      style: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
    },
    xAxis: {
      title: {
        text: '年',
        style: {
          fontSize: '1.6rem',
        },
      },
      labels: {
        style: {
          fontSize: '1.4rem',
        },
      },
      type: 'category',
    },
    yAxis: {
      title: {
        text: '人口数',
        style: {
          fontSize: '1.6rem',
        },
      },
      labels: {
        style: {
          fontSize: '1.4rem',
        },
      },
    },
    legend: {
      itemStyle: {
        fontSize: '1.4rem',
      },
    },
    tooltip: {
      style: {
        fontSize: '1.4rem',
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '1.4rem',
          },
        },
      },
    },
    series: seriesData,
  }

  return (
    <div className={styles.graph_wrapper}>
      <div className={styles.info_wrapper}>
        <h2>人口推移</h2>
        {seriesData.length > 0 ? (
          <ChartRadioButtonList
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
          />
        ) : (
          ''
        )}
      </div>
      {seriesData.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>上のボタンから都道府県を選択して送信してください。</p>
      )}
    </div>
  )
}

export default PopulationChart
