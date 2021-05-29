const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "weatherdb"
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/api/get', (req,res)=>{
    const sqlSelect= "SELECT * FROM my_weather"
    db.query(sqlSelect, (err,result)=>{
      res.send(result)
    })
})

app.post('/api/insert',(req,res)=>{

    const cityName = req.body.cityName
    const weatherState = req.body.weatherState

    const sqlInsert= "INSERT INTO my_weather (city,weather) VALUES(?,?)"
    db.query(sqlInsert,[cityName, weatherState], (err,res)=>{
      console.log(res)
    })
})

app.listen(3001,()=> {
    console.log('running on port 3001')
})