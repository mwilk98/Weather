import React from 'react'
import {Link} from 'react-router-dom'
import { Line } from 'react-chartjs-2';
const WeatherItem = props => {
    const{
        data,
        options,
        city,
        country,
        image,
        weather,
        date,
        time,
        temp,
        tempMax,
        tempMin,
        tempFeel,
        pressure,
        wind,
        clouds,
        humidity,
        sunrise,
        sunset,
        aqi,
        color,
        error} = props.weather

        let content = null

        if(!error && city){
            content = (
                <div className="card" >
                    <div className="face face1">
                        <div className="content">
                        <p>{city} {country}</p>
                        <p>{date} {time}</p>
                        <p><img src={image} width="90" height="90" alt="img"/></p>
                        <h3>{weather}</h3>
                        <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/> {temp}&deg;</p>
                        </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p><img src={weatherIcons[1]} width="20" height="20" alt="img"/>{clouds}% <img src={weatherIcons[4]} width="20" height="20" alt="img"/>{humidity}%</p>
                                <p></p>
                                <p><img src={weatherIcons[2]} width="20" height="20" alt="img"/>{sunrise} <img src={weatherIcons[3]} width="20" height="20" alt="img"/>{sunset}</p>
                                <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/>odczuwalna {tempFeel}&deg;</p>
                                <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/>max:{tempMax}&deg; <img src={weatherIcons[5]} width="20" height="20" alt="img"/>min:{tempMin}&deg;</p>  
                                <p><img src={weatherIcons[6]} width="20" height="20" alt="img"/>{pressure} hPa</p>  
                                <p><img src={weatherIcons[7]} width="20" height="20" alt="img"/>{wind}km/h</p>
                                <p>Jakość powietrza:</p>
                                <p className="aqi" style={{ 
                                                    color: conditionColors[color]
                                                    }}> {aqi}
                                                    <Link to='/air-condition' >
                                                    Sczegłóły
                                                    </Link>
                                                    <Line data={data} options={options} />
                                </p>
                            </div>
                        </div>
                </div>
            )
        }
    return (<div className="weatherCard">
        {error ? `Brak danych dla podanego maista - ${city} nie istnieje lub zostało błędnie wpisane!` : content}

    </div>
    )}

    const weatherIcons = {
        1:'/images/clouds.png',
        2:'/images/sunrise.png',
        3:'/images/sunset.png',
        4:'/images/humidity.png',
        5:'/images/temp.webp',
        6:'/images/pressure.png',
        7:'/images/wind.png',
    }
    const conditionColors = {
        1:'green',
        2:'lightgreen',
        3:'yellow',
        4:'red',
        5:'purple',
    }
export default WeatherItem