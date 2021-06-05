import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import UserPanel from '../UserPanel/UserPanel'
import {Link} from 'react-router-dom'
import './SignUp.css'

function SignUp(){

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [z, setZ] = useState('')

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
                setLoginStatus("unlogged")
            }else{
                setLoginStatus("logged")
            }
        })
    }
    const registerBtn = () =>{
        setX("-400")
        setY("-400")
        setZ("110")
    }
    const loginBtn = () =>{
        setX("0")
        setY("450")
        setZ("0")
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
            <div className="hero">
                <div className="form-box">
                    <div className="button-box">
                        <div className="btn"style={{
                                                    'transform':`translateX(${z}px)`
                                }}></div>
                        <button type="button" className="toggle-btn" onClick={() => loginBtn()}>Log In</button>
                        <button type="button" className="toggle-btn" onClick={() => registerBtn()}>Register</button>
                    </div>
                    <div className="login-input-group" style={{
                                                        'transform':`translateX(${x}px)`
                                }}>
                        <input type="text" className="input-field" placeholder="Nazwa Użytkownika" 
                        onChange={(e)=>{
                            setUsername(e.target.value)
                            }}
                        />
                        <input type="text" className="input-field" placeholder="Hasło" 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                         />
                        <input type="checkbox" className="check-box"/><span>Zapamietaj hasło</span>
                        <button className="submit-btn" onClick={login}>Zaloguj </button>
                    </div>
                    <div className="register-input-group"style={{
                                                        'transform':`translateX(${y}px)`
                                }}>
                        <input type="text" className="input-field" placeholder="Nazwa Użytkownika" required 
                        onChange={(e)=>{
                            setUsernameReg(e.target.value)
                            }}
                        />
                        <input type="email" className="input-field" placeholder="email" required/>
                        <input type="text" className="input-field" placeholder="Hasło" required
                        onChange={(e)=>{
                            setPasswordReg(e.target.value)
                            }}
                        />
                        <button type="submit" className="submit-btn" onClick={register}>Zarejestruj</button>
                    </div>
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