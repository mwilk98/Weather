import React, {useState, useEffect} from 'react'
import './UserPanel.css';
import Axios from 'axios'

function UserPanel(){
    const [cityName, setCityName] = useState('')
    const [weatherState, setWeatherState] = useState('')
    const [cityWeatherList, setcityWeatherList] = useState([])

    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get')
        .then((response)=>{
            setcityWeatherList(response.data)
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
        
        return(
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
                <div className='card4'>
                {cityWeatherList.map((val)=>{
                    return <div className='card3'>
                        <h1>{val.city}</h1>
                        <p>{val.weather}</p>
                        </div>
                })}
                </div>
            </div>
            
        )
}
export default UserPanel