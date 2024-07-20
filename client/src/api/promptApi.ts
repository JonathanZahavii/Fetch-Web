import axios from "axios"

const VITE_PROMPT_BASE_URL = import.meta.env.VITE_PROMPT_BASE_URL

const PromptApi = axios.create({
  baseURL: `${VITE_PROMPT_BASE_URL}`,
  responseType: "json",
})

export default PromptApi
