const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:123456@localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const connect = mongoose.connection

connect.on('error', ()=> {
  console.log('数据库链接失败')
})