import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'

dotenv.config()

const app = express()

const port = process.env.PORT

morgan(':method :url :status - :response-time ms')

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
