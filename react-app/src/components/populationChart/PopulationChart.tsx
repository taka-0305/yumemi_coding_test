import { FC, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import styles from './PopulationChart.module.scss'
import ChartRadioButtonList from '../ChartRadioButtonList/ChartRadioButtonList'
import { usePopulationData } from '../../hooks/usePopulationData'

type Prefecture = {
  prefCode: number
  prefName: string
}

type PopulationChartProps = {
  selectedPrefs: Prefecture[]
}

const PopulationChart: FC<PopulationChartProps> = ({ selectedPrefs }) => {
  const [selectedLabel, setSelectedLabel] = useState('総人口')
  const { seriesData, loading, error } = usePopulationData(
    selectedPrefs,
    selectedLabel
  )

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
      <div className={styles.title}>
        <h2>人口推移</h2>
        {seriesData.length === 0 && (
          <p>上のボタンから都道府県を選択して送信してください。</p>
        )}
      </div>
      {seriesData.length > 0 && (
        <ChartRadioButtonList
          selectedLabel={selectedLabel}
          setSelectedLabel={setSelectedLabel}
        />
      )}
      {seriesData.length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      )}
      {loading && <p>データを取得中...</p>}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default PopulationChart
