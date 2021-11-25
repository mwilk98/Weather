const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

var username2 = "";

app.use(express.json());

app.use(
  session(
    {
    key: "userId",
    secret: "pogoda",
    resave: false,
    saveUninitialized: false,
    cookie: 
    {
      expires: 600 * 600 * 24,
    },
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.use(
  cors(
  {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);


const db = mysql.createPool(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "weatherdb"
});

app.get('/api/get', (req,res)=>
{
  
    const sqlSelect= "SELECT * FROM user"+username2;

    db.query(sqlSelect, (err,result)=>
    {
      res.send(result)
    })
});

app.post('/api/insert',(req,res)=>
{
    const cityName = req.body.cityName;
    const date = req.body.date;
    const time = req.body.time;
    const weatherState = req.body.weatherState;
    const temp = req.body.temp;
    const clouds = req.body.clouds;
    const humidity = req.body.humidity;
    const pressure = req.body.pressure;
    const wind = req.body.wind;
    const aqi = req.body.aqi;

    const sqlInsert= "INSERT INTO user" + username2  +"(city,date,time,weather,temp,clouds,humidity,pressure,wind,aqi) VALUES(?,?,?,?,?,?,?,?,?,?)";
    db.query(sqlInsert,
      [
        cityName,
        date,
        time,
        weatherState,
        temp,
        clouds,
        humidity,
        pressure,
        wind,
        aqi
      ], (err,res)=>
      {
      console.log(res)
      })
});

app.post('/api/register', (req,res)=>
{
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => 
  {
    if (err) 
    {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
        [
          username,
          hash
        ],
      (err, result) => 
      {
        
        console.log(err)
        
      }
    );
    db.query(
      "CREATE TABLE user"+ username+ "(id INT NOT NULL AUTO_INCREMENT,city varchar(255),date date,time varchar(255),weather varchar(255),temp int(3),clouds  int(3),humidity  int(3),pressure  int(3),wind  int(3),aqi  int(3),PRIMARY KEY (`id`))",
      (err, result) => 
      {
        console.log(err)
        res.send(
          {
            err:err
          })
      }
    );
  });
});

app.get("/api/login", (req,res)=>
{
  if (req.session.user) 
  {
    res.send(
      { loggedIn: true,
        user: req.session.user 
      });
  }else 
  {
    res.send(
      { 
        loggedIn: false 
      });
  }
});

app.get("/api/logout", (req,res)=>
{
  if (req.session.user) 
  {
    res.send(
      { 
        loggedIn: false 
      });
  } else 
  {
    res.send(
      { 
        loggedIn: true, 
        user: req.session.user 
      });
  }
})

app.post('/api/login', (req,res)=>
{

  const username = req.body.username;
  const password = req.body.password;

  username2 = username;
  console.log(username2);

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err,result)=>
    {
      if(err)
      {
        res.send(
          {
            err:err
          })
      }
      if(result){
      if(result.length>0)
      {
          bcrypt.compare(password,result[0].password,(err, response)=>
          {
            if(response)
            {
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            }else
            {
              res.send({message:"Złe hasło"});
            }
          })
      }else
      {
        res.send({message:"Użytkownik nie istnieje"});
      }
    }else{
      console.log("server off")
    }
  }
  );
});
app.post('/api/logout', (req,res)=>
{
  req.session.user = "";
  console.log(req.session.user);
  res.send("");
});

app.get('/api/air', (req,res)=>
{
  const sqlSelect= "SELECT * FROM air_condition;";
  db.query(sqlSelect, (err,result)=>
  {
    res.send(result);
  });
});

app.post('/api/weather', (req,res)=>
{
  const id = req.body.id;
  console.log(id);
  db.query(
    "SELECT * FROM icons WHERE id = ?;",
    id,
    (err,result)=>
    {
      if(err)
      {
        res.send(
          {
            err:err
          })
      }
        res.send(result)
    });
});

app.post('/api/delete', (req,res)=>
{
    const id = req.body.id;
    console.log(id);
    db.query(
      "DELETE FROM user"+username2+" where id=?;",
      id,
      (err,result)=>
      {
        if(err)
        {
          res.send(
            {
              err:err
            })
        }
          res.send(result)
      });
});

app.listen(3001,()=> 
{
    console.log('running on port 3001');
});