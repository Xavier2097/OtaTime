import express from 'express'
import * as diaryServices from '../services/diaryServices'
import toNewDiaryEntry from '../util'
const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWhithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  const diary = diaryServices.findById(+req.params.id)
  return (diary != null)
    ? res.send(diary)
    : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    // const { name, email, date, weather } = req.body
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const addDiaryEntry = diaryServices.addDiary(newDiaryEntry)
    res.json(addDiaryEntry)
  } catch (e: any) {
    console.log(e)
    res.status(400).send(e.message)
  }
})

export default router
