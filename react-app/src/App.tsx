import { useEffect, useState } from 'react'
import stlyes from './App.module.scss'
import fetchData from './api/api'
import CheckBox from './components/checkbox'

type Prefecture = {
  prefCode: number
  prefName: string
}

function App() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([])

  useEffect(() => {
    fetchData('api/v1/prefectures')
      .then((data) => setPrefectures(data.result))
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (prefCode: number) => {
    setSelectedPrefs(
      (prev) =>
        prev.includes(prefCode)
          ? prev.filter((code) => code !== prefCode) // すでに選択されていたら削除
          : [...prev, prefCode] // 未選択なら追加
    )
  }

  return (
    <div className={stlyes.wrapper}>
      <h1>API Data</h1>
      <div className={stlyes.checkbox_wrapper}>
        {prefectures.map((row) => (
          <CheckBox
            key={row.prefCode}
            name="prefecture"
            value={String(row.prefCode)}
            checked={selectedPrefs.includes(row.prefCode)}
            onChange={() => handleChange(row.prefCode)}
          >
            {row.prefName}
          </CheckBox>
        ))}
      </div>
    </div>
  )
}

export default App
