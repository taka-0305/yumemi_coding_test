import CheckBox from '../ui/checkbox/checkbox'
import Button from '../ui/button/button'
import styles from './PrefectureForm.module.scss'
import { FC, FormEvent } from 'react'
import { usePrefectures } from '../../hooks/usePrefectures'

type Prefecture = {
  prefCode: number
  prefName: string
}

type PrefectureFormProps = {
  onSubmit: (selectedPrefs: Prefecture[]) => void
}

const PrefectureForm: FC<PrefectureFormProps> = ({ onSubmit }) => {
  const { prefectures, selectedPrefs, handleChange, loading, error } =
    usePrefectures()

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
      {loading && <p>データを取得中...</p>}

      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
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
      )}
      <div className={styles.button_wrapper}>
        <Button>グラフを表示する</Button>
      </div>
    </form>
  )
}

export default PrefectureForm
