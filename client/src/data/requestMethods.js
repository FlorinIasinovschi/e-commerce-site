import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN_ID = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZGQ1NGQyN2FlM2IwNTE1ZDFhNGIxYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0MTg5NTM3MywiZXhwIjoxNjQyMTU0NTczfQ.x8S3pg2ncsdMMzNsxtYgNyLFZInQwzKCaDNm30ilKGQ"

export const publicRequest = axios.create({
  baseURL: BASE_URL
})
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN_ID}` }
})