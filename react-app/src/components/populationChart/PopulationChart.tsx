import { useEffect, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { fetchPopulationDataAPI } from '../../api/population'
import styles from './PopulationChart.module.scss'
import ChartRadioButtonList from '../ChartRadioButtonList/ChartRadioButtonList'
import { FC } from 'react'

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

const PopulationChart: FC<PopulationChartProps> = ({ selectedPrefs }) => {
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [selectedLabel, setSelectedLabel] = useState('総人口')

  useEffect(() => {
    const fetchPopulationData = async (pref: Prefecture) => {
      const data = await fetchPopulationDataAPI(pref.prefCode)
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
    accessibility: { enabled: false },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 768, // 画面幅が 768px 以下の時に適用
          },
          chartOptions: {
            title: {
              style: { fontSize: '1.5rem' },
            },
            xAxis: {
              title: { style: { fontSize: '1rem' } },
              labels: { style: { fontSize: '1rem' } },
            },
            yAxis: {
              title: { style: { fontSize: '1rem' } },
              labels: { style: { fontSize: '1rem' } },
            },
            legend: {
              itemStyle: { fontSize: '1rem' },
            },
            tooltip: {
              style: { fontSize: '1rem' },
            },
            plotOptions: {
              series: {
                dataLabels: {
                  style: { fontSize: '1rem' },
                },
              },
            },
          },
        },
      ],
    },
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
          <p>上のボタンから都道府県を選択して送信してください。</p>
        )}
      </div>
      {seriesData.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        ''
      )}
    </div>
  )
}

export default PopulationChart
