import { useEffect, useState } from 'react'
import { fetchPopulationDataAPI } from '../api/population'

type PopulationData = {
  year: number
  value: number
}

type Prefecture = {
  prefCode: number
  prefName: string
}

export const usePopulationData = (selectedPrefs: Prefecture[], selectedLabel: string) => {
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

      const fetchPopulationData = async (pref: Prefecture) => {
        try {
          const data = await fetchPopulationDataAPI(pref.prefCode)
          const populationData = data.result.data.find((d: any) => d.label === selectedLabel)?.data || []
          return {
            name: `${pref.prefName}`,
            data: populationData.map((d: PopulationData) => [d.year, d.value]),
          }
        } catch (err) {
          setError('データ取得に失敗しました')
          return null
        }
      }
  
      const loadPopulationData = async () => {
        const responses = await Promise.all(
          selectedPrefs.map((pref) => fetchPopulationData(pref))
        )
        if (isMounted) setSeriesData(responses.filter((data) => data !== null))
        setLoading(false)
      }
  
    loadPopulationData()
    
      return () => {
        isMounted = false
      }
  }, [selectedPrefs, selectedLabel])

  return { seriesData, loading, error }
}