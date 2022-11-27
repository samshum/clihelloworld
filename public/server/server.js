const express = require('express')
const app = express()

const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(__dirname + '/'))

//app.use(express.static(__dirname + '/fonts'))
//app.use(express.static(__dirname + '/theme'))
//app.use(express.static(__dirname + '/images'))
//app.use(express.static(__dirname + '/css'))
//app.use(express.static(__dirname + '/js'))
//app.use(express.static(__dirname + '/md'))

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

const port = 5050
app.listen(port, (err)=>{
    if(!err){
        console.log('Server Start!')
        console.log('ServerURL: http://127.0.0.1:' + port)
    }
  })
