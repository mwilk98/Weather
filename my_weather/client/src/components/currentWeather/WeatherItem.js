import React from 'react'
import {Link} from 'react-router-dom'
import { Line } from 'react-chartjs-2';

const WeatherItem = ({element, selectD: selectD }) => 
{
    
    const
    {
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
        pm2_5,
        error,
        errorCity
    } = element;
    
    let content = null

    if(!error && city && !errorCity){
        content = (
            <div className="currentWeatherMain" >
                <div className="conditions" >
                    <div className="conditionsMain" >
                        <h1>{city} {country}</h1>
                        <p>{date} {time}</p>
                        <p><img src={image} width="90" height="90" alt="img"/></p>
                        <p>{weather}</p>
                    </div>
                    <div className="conditionsTemp" >
                        <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/> {temp}&deg;</p>
                        <p><img src={weatherIcons[5]} width="20" height="20" alt="img"/>odczuwalna {tempFeel}&deg;</p>
                        <p>
                            <img src={weatherIcons[5]} width="20" height="20" alt="img"/>max:{tempMax}&deg; 
                            <img src={weatherIcons[5]} width="20" height="20" alt="img"/>min:{tempMin}&deg;      
                        </p>  
                    </div>
                    <div className="conditionsOther" >
                        <p>
                            <img src={weatherIcons[1]} width="20" height="20" alt="img"/>{clouds}% 
                            <img src={weatherIcons[4]} width="20" height="20" alt="img"/>{humidity}%
                            <p><img src={weatherIcons[6]} width="20" height="20" alt="img"/>{pressure} hPa</p>  
                            <p><img src={weatherIcons[7]} width="20" height="20" alt="img"/>{wind}km/h</p>
                            </p>
                    </div>
                    <div className="conditionsSun" >
                        <p>
                            <img src={weatherIcons[2]} width="20" height="20" alt="img"/>{sunrise} 
                            <img src={weatherIcons[3]} width="20" height="20" alt="img"/>{sunset}
                        </p>
                    </div>
                    <div className="conditionsAqi"  style={
                                                    { 
                                                        background: conditionColors[color]
                                                    }
                    }>
                        <p>Jakość powietrza:</p>
                        <p>  {aqi}</p>
                        <p>({Math.floor((pm2_5/35)*100)}%)</p>
                        <p>
                            <Link to='/air-condition' >
                                <button type="button">
                                   Szczegóły
                                </button>
                            </Link>
                        </p>
                        
                        </div>
                        </div>
                        <p>
                            <button  onClick={selectD.bind(null,1)}> Temperatura</button>
                            <button  onClick={selectD.bind(null,2)}> Ciśnienie</button>
                            <button  onClick={selectD.bind(null,3)}> Wilgotność</button>
                        </p>
                        <div className="chart" >
                        <p><Line data={data} options={options} width={"30%"} /></p>
                        </div>

                </div>
            )
        }
    return (
    <div className="currentWeatherMain">
        {error ? <h1>Brak danych dla podanego maista - {city} nie istnieje lub zostało błędnie wpisane!</h1> : content}
        {errorCity ? <h1>Usługa jest aktualnie niedostępna - error API</h1> : null}
    </div>
    )};

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

    const conditionColors = 
    {
        1:'green',
        2:'lightgreen',
        3:'yellow',
        4:'red',
        5:'purple',
    };
    
export default WeatherItem;