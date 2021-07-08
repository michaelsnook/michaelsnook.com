const api_url = process.env.API_URL

export async function getAPI(path) {
  const url = `${api_url}/${path}`
  const headers = { 'Content-Type': 'application/json' }
  const res = await fetch(url, { method: 'GET', headers: headers })
  const data = await res.json()
  return data
}
