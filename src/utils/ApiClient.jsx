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

  return window
    .fetch(`${settings.API_URL}/${settings.API_VERSION}/${endpoint}`, config)
    .then(r => r.json())
}

export default client