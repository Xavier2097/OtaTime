import { DiaryEntry, NonSensitiveIndoDiaryEntry, newDiaryEntry } from '../types'
import diaryData from './diaries.json'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (id: number): NonSensitiveIndoDiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  if (entry != null) {
    const { email, ...restOfDiary } = entry
    return restOfDiary
  }
  return undefined
}

export const getEntriesWhithoutSensitiveInfo = (): NonSensitiveIndoDiaryEntry[] => {
  return diaries.map(({ id, name, date, weather }) => {
    return {
      id, name, date, weather
    }
  })
}

export const addDiary = (newDiaryEntry: newDiaryEntry): DiaryEntry => {
  const newDiary: DiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}
