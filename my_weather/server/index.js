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

app.post('/api/register', (req,res)=>{


  const username = req.body.username
  const password = req.body.password

  db.query("INSERT INTO users (username,password) VALUES (?,?)", [username,password],
    (err,result)=>{
      console.log(err)
    }
  )
})

app.post('/api/login', (req,res)=>{

  const username = req.body.username
  const password = req.body.password

  db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username,password],
    (err,result)=>{
      if(err){
        res.send({err:err})
      }else{
        if(result.length>0){
          res.send(result)
        }else{
          res.send({message:"No user found"})
        }
      }
      
    }
  )

})

app.listen(3001,()=> {
    console.log('running on port 3001')
})