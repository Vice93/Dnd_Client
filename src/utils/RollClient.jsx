import client from './ApiClient'

function rollDie(dieSize, rollCount, modifier, keep) {
  let query = `?sCount=${dieSize}&dCount=${rollCount}`
  if (modifier) query += `&mod=${modifier}`
  if (keep) query += `&keep=${keep}`

  return client(`/roll/die${query}`)
    .then(res => {
      console.log(res)
      return Promise.resolve(res)
    })
}

export { rollDie }