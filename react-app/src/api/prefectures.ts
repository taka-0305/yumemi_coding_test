import fetchData from './fetchClient'

type Prefecture = {
  prefCode: number
  prefName: string
}

export const fetchPrefecturesDataAPI = async (): Promise<Prefecture[]> => {
  const data = await fetchData('api/v1/prefectures');
  return data.result;
}
