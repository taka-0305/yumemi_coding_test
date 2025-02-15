import { useState } from 'react'
import stlyes from './App.module.scss'
import PrefectureForm from './components/PrefectureForm/PrefectureForm'
import PopulationChart from './components/PopulationChart/PopulationChart'

type Prefecture = {
  prefCode: number
  prefName: string
}

function App() {
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([])

  return (
    <div className={stlyes.wrapper}>
      <h1>都道府県別の総人口推移グラフ</h1>
      <PrefectureForm onSubmit={setSelectedPrefs} />
      <PopulationChart selectedPrefs={selectedPrefs} />
    </div>
  )
}

export default App
