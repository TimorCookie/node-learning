const express = require('express')
const app = express()
const path = require('path')
const mongo = require('./models/db')
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"))
})
app.get('/api/list', async (req, res) => {
  // 分页查询
  const { page, category ,keyword } = req.query
  try {
    const col = mongo.col('fruits')
    let params = {}
    if(category) {
      params.category = category
    }
    if(keyword) {
      params.name = { $regex: new RegExp(keyword) }
    }
    const total = await col.find(params).count()
    const fruits = await col
      .find(params)
      .skip((page - 1) * 5)
      .limit(5)
      .toArray()

    res.json({
      code: 0,
      data: {
        fruits,
        pagination: { total, page }
      }
    })
  } catch (error) {
    console.log(error)
  }
})
app.get("/api/category", async (req, res) => {
  const col = mongo.col("fruits")
  const data = await col.distinct('category')
  res.json({ code: 0, data })
})
app.listen(3001, () => console.log(`app is starting at http://localhost:3001`))