
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy'
}
export interface DiaryEntry {
  id: number
  name: string
  email: string
  date: string
  weather: Weather
}

// export type NonSensitiveIndoDiaryEntry = Pick<DiaryEntry, 'id' | 'name' | 'date' | 'weather'>
export type NonSensitiveIndoDiaryEntry = Omit<DiaryEntry, 'email' >

export type newDiaryEntry = Omit<DiaryEntry, 'id' >
