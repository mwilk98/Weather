const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const cookieParser = require("cookie-parser")
const session = require("express-session")

const bcrypt = require("bcrypt")
const saltRounds = 10


app.use(express.json())

app.use(
  session({
    key: "userId",
    secret: "pogoda",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
)

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "weatherdb"
})



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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err)
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err)
      }
    )
  })
})

app.get("/api/login", (req,res)=>{
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
})

app.post('/api/login', (req,res)=>{

  const username = req.body.username
  const password = req.body.password

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err,result)=>{
      if(err){
        res.send({err:err})
      }
      if(result.length>0){
          bcrypt.compare(password,result[0].password,(err, response)=>{
            if(response){
              req.session.user = result
              console.log(req.session.user)
              res.send(result)
            }else{
              res.send({message:"Wrong username/password combination!"})
            }
          })
      }else{
        res.send({message:"User doesn't exist"})
      }
    }
  )

})

app.listen(3001,()=> {
    console.log('running on port 3001')
})