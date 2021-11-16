import React from 'react'

const ForecastHourlyItem=({element})=>
{
    const
    {
        image,
        weather,
        date,
        time,
        temp,
        tempFeel,
        pressure,
        wind,
        clouds,
        humidity
    } = element;
    return ( 
        <div className="forecastCard">
            <div className="card" >
                <div className="face face1">
                    <div className="content">
                        <p>{date}</p>
                        <p>{time}</p>
                        <p><img src={image} width="90" height="90" alt="img"/></p>
                        <h3>{weather}</h3>
                        <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/>{temp}&deg; </p>
                        </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <p><img src={weatherIcons[1]} width="20" height="20" alt="img"/>{clouds}% <img src={weatherIcons[4]} width="20" height="20" alt="img"/>{humidity}%</p>
                                <p></p>
                                <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/>Odczuwalna:{tempFeel}&deg;</p>  
                                <p><img src={weatherIcons[6]} width="20" height="20" alt="img"/>{pressure} hPa</p>  
                                <p><img src={weatherIcons[7]} width="20" height="20" alt="img"/>{wind}km/h</p>
                            </div>
                        </div>
                </div>
        </div>
    )
};

const weatherIcons = 
{
    1:'/images/clouds.png',
    2:'/images/sunrise.png',
    3:'/images/sunset.png',
    4:'/images/humidity.png',
    5:'/images/temp.webp',
    6:'/images/pressure.png',
    7:'/images/wind.png',
};

export default ForecastHourlyItem;