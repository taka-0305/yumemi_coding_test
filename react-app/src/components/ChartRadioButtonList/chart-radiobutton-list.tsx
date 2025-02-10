import { useState } from 'react'
import styles from './chart-radiobutton-list.module.scss'
import RadioBox from '../ui/radiobox/radiobox'

type ChartRadioButtonProps = {
  selectedLabel: string
  setSelectedLabel: (label: string) => void
}

const ChartRadioButtonList: React.FC<ChartRadioButtonProps> = ({
  selectedLabel,
  setSelectedLabel,
}) => {
  return (
    <div className={styles.radio_inputs}>
      <RadioBox
        name="chart-label"
        value="総人口"
        checked={selectedLabel === '総人口'}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        総人口
      </RadioBox>
      <RadioBox
        name="chart-label"
        value="年少人口"
        checked={selectedLabel === '年少人口'}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        年少人口
      </RadioBox>
      <RadioBox
        name="chart-label"
        value="生産年齢人口"
        checked={selectedLabel === '生産年齢人口'}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        生産年齢人口
      </RadioBox>
      <RadioBox
        name="chart-label"
        value="老年人口"
        checked={selectedLabel === '老年人口'}
        onChange={(e) => setSelectedLabel(e.target.value)}
      >
        老年人口
      </RadioBox>
    </div>
  )
}

export default ChartRadioButtonList
