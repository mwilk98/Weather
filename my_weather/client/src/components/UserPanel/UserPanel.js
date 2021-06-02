import React, {useState, useEffect} from 'react'
import './UserPanel.css';
import Axios from 'axios'
import UserWeatherItem from './UserWeatherItem';

function UserPanel(){

    const [cityName, setCityName] = useState('')
    const [weatherState, setWeatherState] = useState('')

    const [cityWeatherList, setcityWeatherList] = useState([])
    const [property, setProperty] = useState([])

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')
    console.log(loginStatus)

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
                console.log(loginStatus)
            }else{
                setLoginStatus(response.data[0].username)
            }
        })
    }
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get')
        .then((response)=>{
            setcityWeatherList(response.data)
            setProperty(response.data[0])
        })

    },[])
    
    const submitWeather = () =>{

        Axios.post('http://localhost:3001/api/insert',{
            cityName:cityName,weatherState:weatherState
        })
        setcityWeatherList([...cityWeatherList,{
                city:cityName,
                weather:weatherState
            },])
    }
    const nextProperty = () => {
        const newIndex = property.id

        setProperty(cityWeatherList[newIndex])
        console.log(newIndex)
        console.log(property)
    }
    
    const prevProperty = () => {
        const newIndex = property.id-2
        setProperty(cityWeatherList[newIndex])
    }
    if(loginStatus!="No user found"){
        return(
            <div className="main"style={{ 
                backgroundImage: `url("/images/bg_myWeather.jpg")` 
              }}>
            <div className='user-panel'>
                <h1>Moja Pogoda</h1>  
                <div className='user-form'>
                    <label>Miejsce</label>
                    <input type="text" name="cityName" onChange={(e)=>{
                        setCityName(e.target.value)
                    }}/>
                    <label>Pogoda</label>
                    <input type="text" name="weather"onChange={(e)=>{
                        setWeatherState(e.target.value)
                    }}/>

                    <button onClick={submitWeather}>Dodaj</button>
                </div>
                <div className="main-cards">
                {property ?(
                    <div className="userCards-slider">
                        <button className="left" 
                                onClick={() => nextProperty()} 
                                disabled={property.id === cityWeatherList.length}
                                >Next
                        </button>
                        <div className="userCards-slider-wrapper" style={{
                            'transform':`translateX(-${property.id*(100/cityWeatherList.length)}%)`
                        }}>
                            {cityWeatherList.map(fde => <UserWeatherItem element={fde} />)}
                        </div>
                        <button className="right"
                                onClick={() => prevProperty()} 
                                disabled={property.id === 1}
                        >Prev
                        </button>
                    </div>
                    ):null}
                </div>
            </div>
            </div>
        )
    }else{

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
            </h1>
        </div>
        )
    }
}
export default UserPanel