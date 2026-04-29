const productionApiUrl = import.meta.env.VITE_API_URL
const localApiUrl = "http://localhost:3000"

export const API_URL = import.meta.env.DEV ? localApiUrl : productionApiUrl