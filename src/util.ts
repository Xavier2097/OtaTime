import { Weather, newDiaryEntry } from './types'

const parseEmail = (emailFromsRequest: any): string => {
  if (!isString(emailFromsRequest)) {
    throw new Error('Incorrect or missing email')
  }
  return emailFromsRequest
}
const parseName = (nameFromsRequest: any): string => {
  if (!isString(nameFromsRequest)) {
    throw new Error('Incorrect or missing name')
  }
  return nameFromsRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }
  return dateFromRequest
}
const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Incorrect or missing weather')
  }
  return weatherFromRequest
}

const isWeather = (params: any): boolean => {
  return Object.values(Weather).includes(params)
}

const isString = (string: string): boolean => {
  return typeof string === 'string'
}
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
const toNewDiaryEntry = (object: any): newDiaryEntry => {
  const newEntry: newDiaryEntry = {
    email: parseEmail(object.email),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    name: parseName(object.name)
  }
  return newEntry
}

export default toNewDiaryEntry
