import React, {useState, useEffect} from 'react'
import './UserPanel.css';
import Axios from 'axios'
import UserWeatherItem from './UserWeatherItem';
import {Link} from 'react-router-dom'

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

   
    useEffect(()=>{
        Axios.get('http://localhost:3001/api/login').then((response)=>{
            if(response.data.loggedIn==true){
                setLoginStatus(response.data.user[0].username)
                console.log(response)
            }else{
                setLoginStatus("unlogged")
            }
        })
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
    if(loginStatus!="unlogged"){
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
            <div><h1>Musisz być zalogowanym aby korzystać z tej funkcji</h1>
            <Link to='/sign-up'>
                Zaloguj
            </Link>
            </div> 
        )
    }
}
export default UserPanel