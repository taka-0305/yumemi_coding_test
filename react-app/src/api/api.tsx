import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
  },
})

const fetchData = async (endpoint: string) => {
  try {
    const response = await apiClient.get(`/${endpoint}`)
    return response.data
  } catch (error) {
    console.error('fetch error:', error)
    return null
  }
}

export default fetchData
