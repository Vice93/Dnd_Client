const fs = require('fs')
const settingsFilePath = './src/settings.json'

const setEnvironmentVariables = () => {
  if(process === undefined)
    return console.log("process is undefined, cant save env.variables to settings.json");
  
  const settings = readSettings()
  if(settings === null) return

  settings.API_URL = process.env.API_URL || "http://localhost:8080"
  // more settings required on runtime

  writeSettings(settings)
}

const readSettings = () => {
  try {
    const file = fs.readFileSync(settingsFilePath)
    return JSON.parse(file)
  } catch (err) {
    console.log('Failed to read settings.json', err)
    return null
  }
}

const writeSettings = (settings) => {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings))
  } catch (err) {
    console.log('Failed to write to settings.json', err)
  }
}

setEnvironmentVariables()