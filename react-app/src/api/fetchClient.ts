import axios from 'axios'

const API_URL = process.env.VITE_API_URL
const API_KEY = process.env.VITE_API_KEY

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': API_KEY,
  },
})

const fetchData = async (endpoint: string, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params })
    return response.data
  } catch (error) {
    console.error('fetch error:', error)
    throw error
  }
}

export default fetchData
