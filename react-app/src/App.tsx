import { useState } from 'react'
import stlyes from './App.module.scss'
import PrefectureForm from './components/prefectureForm/prefecture-form'
import PopulationChart from './components/populationChart/population-chart'

type Prefecture = {
  prefCode: number
  prefName: string
}

function App() {
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([])

  return (
    <div className={stlyes.wrapper}>
      <PrefectureForm onSubmit={setSelectedPrefs} />
      <PopulationChart selectedPrefs={selectedPrefs} />
    </div>
  )
}

export default App
