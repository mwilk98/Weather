import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import UserPanel from '../UserPanel/UserPanel'
import {Link} from 'react-router-dom'

function SignUp(){

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    Axios.defaults.withCredentials = true

    const register = () => {
        Axios.post('http://localhost:3001/api/register',{
            username:usernameReg,
            password:passwordReg
        }).then((response) =>{
            console.log(response)
        })
    }

    const login = () => {
        Axios.post('http://localhost:3001/api/login',{
            username:username,
            password:password
        }).then((response) =>{
            console.log(response)
            if(response.data.message){
                setLoginStatus(response.data.message)
            }else{
                setLoginStatus(response.data[0].username)
            }
        })
    }

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/login').then((response)=>{
            if(response.data.loggedIn==true){
                setLoginStatus(response.data.user[0].username)
                console.log(response)
            }
        })
    },[])
        return(
            <div>
            <div className="register">
                <h1>Registration</h1>
                <label>Username</label>
                <input type="text" onChange={(e)=>{
                    setUsernameReg(e.target.value)
                    }}
                />
                <label>Password</label>
                <input type="text" onChange={(e)=>{
                    setPasswordReg(e.target.value)
                    }}
                />
                <button onClick={register}>Register</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <label>Username</label>
                <input type="text" onChange={(e)=>{
                    setUsername(e.target.value)
                    }}
                />
                <label>Password</label>
                <input type="text" onChange={(e)=>{
                    setPassword(e.target.value)
                    }}
                />
                <button onClick={login}>Login</button>
            </div>
            <h1>
                {loginStatus}
                <Link to='/my-weather'>
                Powrót
                </Link>
            </h1>
        </div>
        )
    }
export default SignUp
