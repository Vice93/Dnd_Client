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
    .fetch(`${process.env.SERVER_URL || 'localhost:3001'}/${endpoint}`, config)
    .then(r => r.json())
}

export default client