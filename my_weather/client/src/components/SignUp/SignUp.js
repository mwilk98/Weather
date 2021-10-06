import React,{useEffect, useState} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'
import './SignUp.css'

import { useHistory } from "react-router-dom";

function SignUp(){

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')

    const [x, setX] = useState('')
    const [y, setY] = useState('')
    const [z, setZ] = useState('')

    const history = useHistory();

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
                history.push("/my-weather");
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
            if(response.data.loggedIn===true){
                setLoginStatus(response.data.user[0].username)
                console.log(response)
            }
        })
    },[])
        return(
            <div className="hero" style={{ 
                backgroundImage: `url("/images/bg_signUp.jpg")` 
            }}>
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
                        <button className="submit-btn" onClick={login}>Zaloguj </button>
                        <Link to='/my-weather'><button type="submit" className="submit-btn" >Powrót</button></Link>
                        <h1>{loginStatus}</h1> 
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
                        <Link to='/my-weather'><button type="submit" className="submit-btn" >Powrót</button></Link>
                    </div>
                </div>   
            </div>
        )   
    }
export default SignUp
