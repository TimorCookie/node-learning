const conf = require('./config')
const { EventEmitter } = require('events')
const { MongoClient } = require('mongodb');

class MongoDB {
  constructor(conf) {
    this.conf = conf
    this.emitter = new EventEmitter()
    this.client = new MongoClient(conf.url, {
      useNewUrlParser: true
    })
    this.client.connect(err => {
      if (err) throw err
      console.log('链接成功...')
      this.emitter.emit('connect')
    })
  }
  col(colName, dbName = conf.dbName) {
    return this.client.db(dbName).collection(colName)
  }
  once(event, cb) {
    this.emitter.once(event, cb)
  }
}

module.exports = new MongoDB(conf)