import settings from '../settings.json'

function client(endpoint, {body, ...customConfig} = {}) {
  const token = window.localStorage.getItem('__dnd_token__')
  const headers = {'content-type': 'application/json'}
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }
  if (body) {
    config.body = JSON.stringify(body)
  }
  console.log(settings.API_URL)
  return window
    .fetch(`${settings.API_URL}/v1/${endpoint}`, config)
    .then(r => r.json())
}

export default client