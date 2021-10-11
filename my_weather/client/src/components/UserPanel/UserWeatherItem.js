import React from 'react'

const ForecastDailyItem=({element, deleteW: deleteW })=>{
    const {id,city,date,time,weather,temp,clouds,humidity,pressure,wind,aqi,color} = element;
    return ( 
        <div className="userCard">
            <div className="card" >
                    <div className="face face1">
                        <div className="content">
                        <p>{id}</p>
                        <p>{city}</p>
                        <p>{date} {time}</p>
                        {/*<p><img src={image} width="90" height="90" /></p>*/}
                        <h3>{weather}</h3>
                        <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/> {temp}&deg;</p>
                        </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p><img src={weatherIcons[1]} width="20" height="20" alt="img"/>{clouds}% <img src={weatherIcons[4]} width="20" height="20" alt="img"/>{humidity}%</p>
                                <p></p>
                                <p><img src={weatherIcons[6]} width="20" height="20" alt="img"/>{pressure} hPa</p>  
                                <p><img src={weatherIcons[7]} width="20" height="20" alt="img"/>{wind}km/h</p>
                                <p>Jakość powietrza:<p className="aqi" style={{ 
                                                    color: conditionColors[color]
                                }}> {aqi}</p></p>
                                <p><button type="submit" className="submit-btn3" onClick={deleteW.bind(null,id)} >USUN</button></p>
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