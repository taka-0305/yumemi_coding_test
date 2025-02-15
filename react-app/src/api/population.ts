import fetchData from './fetchClient'

export const fetchPopulationDataAPI = async (prefCode: number) => {
  return fetchData(`api/v1/population/composition/perYear`, { prefCode })
}