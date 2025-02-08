import { useEffect, useState } from 'react'
import CheckBox from '../checkbox/checkbox'
import fetchData from '../../api/api'

type Prefecture = {
  prefCode: number
  prefName: string
}

type PrefectureFormProps = {
  onSubmit: (selectedPrefs: number[]) => void
}

const PrefectureForm: React.FC<PrefectureFormProps> = ({ onSubmit }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([])

  useEffect(() => {
    fetchData('api/v1/prefectures')
      .then((data) => setPrefectures(data.result))
      .catch((err) => console.error(err))
  }, [])

  const handleChange = (prefCode: number) => {
    setSelectedPrefs((prev) =>
      prev.includes(prefCode)
        ? prev.filter((code) => code !== prefCode)
        : [...prev, prefCode]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // ページのリロードを防ぐ
    onSubmit(selectedPrefs) // 選択された都道府県を親コンポーネントに渡す
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>都道府県リスト</h2>
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
      <br />
      <button type="submit">送信</button>
    </form>
  )
}

export default PrefectureForm
