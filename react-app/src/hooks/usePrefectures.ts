import { useEffect, useState } from 'react'
import { fetchPrefecturesDataAPI } from '../api/prefectures'

type Prefecture = {
  prefCode: number
  prefName: string
}

export const usePrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  
  useEffect(() => {
    let isMounted = true

    const loadPrefecturesData = async () => {
      try {
        const data = await fetchPrefecturesDataAPI()
        if (isMounted) {
          setPrefectures(data)
          setLoading(false)
        }
      } catch (error) {
        setError('データの取得に失敗しました')
      }
    }

    loadPrefecturesData()

    return () => {
      isMounted = false
    }
  }, [])

  const handleChange = (prefCode: number, prefName: string) => {
    setSelectedPrefs((prev) =>
      prev.some((pref) => pref.prefCode === prefCode)
        ? prev.filter((pref) => pref.prefCode !== prefCode)
        : [...prev, { prefCode, prefName }]
    )
  }

  return { prefectures, selectedPrefs, handleChange, loading, error }
}