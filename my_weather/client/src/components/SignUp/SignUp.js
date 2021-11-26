import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './SignUp.css';
import { useForm } from 'react-hook-form';

function SignUp()
{

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [z, setZ] = useState('');

    const history = useHistory();

    Axios.defaults.withCredentials = true;

    const { register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (values) => {
        console.log(values)
        Axios.post('http://localhost:3001/api/register',
        {
            username:values.user,
            password:values.password
        }).then((response) =>
        {
            console.log(response);
            if(!response.data.err){
                
                alert(`Dodano użytkownika ${values.user}`)
                //window.location.reload(false);
                loginBtn()
            }else{

                alert(`Nie dodano użytkownika ${values.user} ponieważ taki już istnieje!`)
            }
        })
    }

    const registerUser = () => 
    {
       
        
        
    }

    const login = () => 
    {
        Axios.post('http://localhost:3001/api/login',
        {
            username:username,
            password:password
        }).then((response) =>
        {
            console.log(response.data.err);
            if(response.data.message)
            {
                alert(response.data.message)
                setLoginStatus("unlogged");
            }else
            {
                setLoginStatus("logged");
                history.push("/my-weather");
            }
            if(response.data.err){
                alert("Błąd servera - offline")
            }
        })
    }
    const registerBtn = () =>
    {
        setX("-400");
        setY("-400");
        setZ("110");
    }
    const loginBtn = () =>
    {
        setX("0");
        setY("450");
        setZ("0");
    }
    const logout = () =>
    {
        Axios.post('http://localhost:3001/api/logout')
            .then((response) =>
            {
            console.log(response);
            if(response.data.message)
            {
                setLoginStatus("logged");
            }else
            {
                setLoginStatus("unlogged");
            }
        })
        Axios.get('http://localhost:3001/api/logout').then((response)=>
        {
            if(response.data.loggedIn===false)
            {
                console.log(response);
                setLoginStatus("unlogged");
            }else
            {
                setLoginStatus("logged");
                console.log(response);
            }
        })
        window.location.reload(false);
    }
    useEffect(()=>
    {
        Axios.get('http://localhost:3001/api/login').then((response)=>
        {
            if(response.data.loggedIn===true)
            {
                setLoginStatus(response.data.user[0].username);
                console.log(response);
            }else
            {
                setLoginStatus("unlogged");
            }
        })
    },[])
    if(loginStatus==="unlogged")
    {
        return(
            <div className="hero"   style={
                                    { 
                                        backgroundImage: `url("/images/bg_signUp.jpg")` 
                                    }
            }>
                <div className="form-box">
                    <div className="button-box">
                        <div className="btn"style={
                                            {
                                                'transform':`translateX(${z}px)`
                                            }
                        }>
                        </div>
                        <button type="button" className="toggle-btn" onClick={() => loginBtn()}> Log In </button>
                        <button type="button" className="toggle-btn" onClick={() => registerBtn()}> Register </button>
                    </div>
                    <div className="login-input-group"  style={
                                                        {
                                                            'transform':`translateX(${x}px)`
                                                        }
                    }>
                        
                        <input type="text" className="input-field" placeholder="Nazwa Użytkownika" 
                        onChange={(e)=>{setUsername(e.target.value)}}/>

                        <input type="password"  className="input-field" placeholder="Hasło" 
                        onChange={(e)=>{setPassword(e.target.value)}}/>

                        <button className="submit-btn" onClick={login}>Zaloguj </button>
                        
                        <Link to='/my-weather'><button type="submit" className="submit-btn"> Powrót </button></Link>

                    </div>
                    <div className="register-input-group"   style={
                                                            {
                                                                'transform':`translateX(${y}px)`
                                                            }
                    }>
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" minlength="4" className="input-field" placeholder="Nazwa Użytkownika"
                        {...register("user", {
                            required: "Required",
                        })}/>   
                        <input type="password" minlength="8" className="input-field" placeholder="Hasło"
                        {...register("password", {
                            required: "Required",
                        })}/> 

                        <input type="submit" className="submit-btn2" value="Zarejestruj"/> 
                        {errors.message && errors.message.message}
                        </form>
                        <Link to='/my-weather'><button type="submit" className="submit-btn"> Powrót </button></Link>

                    </div>
                </div>   
            </div>
        )   
    }else
    {
        return(
            <div className="hero"   style={
                                    { 
                                        backgroundImage: `url("/images/bg_signUp.jpg")` 
                                    }
            }>
                <div className="form-box">
                    <div className="login-input-group" >
                        <h1>Jesteś już zalogowany jako  {loginStatus}</h1>

                        <button type="submit" className="submit-btn2" onClick={logout}> Wyloguj </button>
                        
                        <Link to='/my-weather'><button type="submit" className="submit-btn"> Powrót </button></Link>
                    </div>
                </div>   
            </div>
        );
    }
}
export default SignUp;
