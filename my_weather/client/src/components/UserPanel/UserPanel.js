import React, {useState, useEffect} from 'react'
import './UserPanel.css';
import Axios from 'axios'
import UserWeatherItem from './UserWeatherItem';
import {Link} from 'react-router-dom'

function UserPanel(){

    const [cityName, setCityName] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [weatherState, setWeatherState] = useState('')
    const [temp, setTemp] = useState('')
    const [clouds, setClouds] = useState('')
    const [humidity, setHumidity] = useState('')
    const [pressure, setPressure] = useState('')
    const [wind, setWind] = useState('')
    const [aqi, setAqi] = useState('')


    const [cityWeatherList, setcityWeatherList] = useState([])
    const [property, setProperty] = useState([])

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
            setProperty(response.data[1])
        })
    },[])
    const submitWeather = () =>{

        Axios.post('http://localhost:3001/api/insert',{
            cityName:cityName,
            date:date,
            time:time,
            weatherState:weatherState,
            temp:temp,
            clouds:clouds,
            humidity:humidity,
            pressure:pressure,
            wind:wind,
            aqi:aqi
        })
        setcityWeatherList([...cityWeatherList,{
            cityName:cityName,
            date:date,
            time:time,
            weatherState:weatherState,
            temp:temp,
            clouds:clouds,
            humidity:humidity,
            pressure:pressure,
            wind:wind,
            aqi:aqi
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
    if(loginStatus=="unlogged"){
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
                    <label>Data</label>
                    <input type="text" name="date"onChange={(e)=>{
                        setDate(e.target.value)
                    }}/>
                    <label>Godzina</label>
                    <input type="text" name="time"onChange={(e)=>{
                        setTime(e.target.value)
                    }}/>
                    <label>Pogoda</label>
                    <input type="text" name="weather"onChange={(e)=>{
                        setWeatherState(e.target.value)
                    }}/>
                    <label>Temperatura</label>
                    <input type="text" name="temp"onChange={(e)=>{
                        setTemp(e.target.value)
                    }}/>
                    <label>Zachmurzenie</label>
                    <input type="text" name="clouds"onChange={(e)=>{
                        setClouds(e.target.value)
                    }}/>
                    <label>Wilgotność</label>
                    <input type="text" name="humidity"onChange={(e)=>{
                        setHumidity(e.target.value)
                    }}/>
                    <label>Ciśnienie</label>
                    <input type="text" name="pressure"onChange={(e)=>{
                        setPressure(e.target.value)
                    }}/>
                    <label>Wiatr</label>
                    <input type="text" name="wind"onChange={(e)=>{
                        setWind(e.target.value)
                    }}/>
                    <label>Jakość powietrza</label>
                    <input type="text" name="aqi"onChange={(e)=>{
                        setAqi(e.target.value)
                    }}/>
                    <button onClick={submitWeather}>Dodaj</button>
                </div>
                </div>
                <div className="user-main">
                {property ?(
                    <div className="user-cards">
                        <button className="left" 
                            onClick={() => nextProperty()} 
                            disabled={property.id === cityWeatherList.length}
                        >Next
                        </button>
                        <button className="right"
                            onClick={() => prevProperty()} 
                            disabled={property.id === 2}
                        >Prev
                        </button>
                        <div className="main-cards">
                            <div className="userCards-slider">
                                <div className="userCards-slider-wrapper" style={{
                                                                          'transform':`translateX(-${property.id*(100/cityWeatherList.length-3)}%)`
                                }}>
                                    {cityWeatherList.map(fde => <UserWeatherItem element={fde} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                ):null}
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