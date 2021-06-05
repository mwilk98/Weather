import React from 'react'

const ForecastDailyItem=({element})=>{
    const {id,city,date,time,weather,temp,clouds,humidity,pressure,wind,aqi,image,color} = element;
    return ( 
        <div className="weatherCard">
            <div className="card" >
                    <div className="face face1">
                        <div className="content">
                        <p>{city}</p>
                        <p>{date} {time}</p>
                        {/*<p><img src={image} width="90" height="90" /></p>*/}
                        <h3>{weather}</h3>
                        <p><img src={weatherIcons[5]} width="20" height="20" /> {temp}&deg;</p>
                        </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p><img src={weatherIcons[1]} width="20" height="20" />{clouds}% <img src={weatherIcons[4]} width="20" height="20" />{humidity}%</p>
                                <p></p>
                                <p><img src={weatherIcons[6]} width="20" height="20" />{pressure} hPa</p>  
                                <p><img src={weatherIcons[7]} width="20" height="20" />{wind}km/h</p>
                                <p>Jakość powietrza:<p className="aqi" style={{ 
                                                    color: conditionColors[color]
                                }}> {aqi}</p></p>
                            </div>
                        </div>
                </div>
        </div>
    )
}
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
export default ForecastDailyItem