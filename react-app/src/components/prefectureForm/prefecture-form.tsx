import { useEffect, useState } from 'react'
import CheckBox from '../ui/checkbox/checkbox'
import Button from '../ui/button/button'
import { fetchPrefecturesDataAPI } from '../../api/prefectures'
import styles from './prefecture-form.module.scss'
import { FC, FormEvent } from 'react'

type Prefecture = {
  prefCode: number
  prefName: string
}

type PrefectureFormProps = {
  onSubmit: (selectedPrefs: Prefecture[]) => void
}

const PrefectureForm: FC<PrefectureFormProps> = ({ onSubmit }) => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([])

  useEffect(() => {
    const loadPrefecturesData = async () => {
      const data = await fetchPrefecturesDataAPI()
      setPrefectures(data)
    }
    loadPrefecturesData()
  }, [])

  const handleChange = (prefCode: number, prefName: string) => {
    setSelectedPrefs((prev) =>
      prev.some((pref) => pref.prefCode === prefCode)
        ? prev.filter((pref) => pref.prefCode !== prefCode)
        : [...prev, { prefCode, prefName }]
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault() // ページのリロードを防ぐ
    onSubmit(selectedPrefs) // 選択された都道府県を親コンポーネントに渡す
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.title}>
        <h2>都道府県を選択する</h2>
        <p>グラフに表示する都道府県を選択してください。</p>
      </div>
      <div className={styles.checkbox_wrapper}>
        {prefectures.map((row) => (
          <CheckBox
            key={row.prefCode}
            name="prefecture"
            value={String(row.prefCode)}
            checked={selectedPrefs.some((p) => p.prefCode === row.prefCode)}
            onChange={() => handleChange(row.prefCode, row.prefName)}
          >
            {row.prefName}
          </CheckBox>
        ))}
        <br />
      </div>
      <div className={styles.button_wrapper}>
        <Button>グラフを表示する</Button>
      </div>
    </form>
  )
}

export default PrefectureForm
