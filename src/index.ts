import express from 'express'

const app = express()

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
  })
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
