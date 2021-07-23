import express from 'express'

const app = express()

app.get('/', (req, resp) => {
  return resp.json({ message: 'Hello world' })
})

app.listen(4000, () => {
  console.log('app running on port 4000')
})
