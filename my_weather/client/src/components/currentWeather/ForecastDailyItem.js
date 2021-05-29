import React from 'react'

const ForecastDailyItem=({element})=>{
    const {id,date,image,background,weather,temp,pressure,wind} = element;
    return ( 
        <div className="weatherCard">
            <div className="card" >
                <div className="face face1">
                    <div className="content">
                        <h3>DZIENNA:</h3>
                        <p>{date}</p>
                        <p><img src={image} width="100" height="100" /></p>
                        <p>{weather} </p>
                    </div>
                </div>
                <div className="face face2">
                    <div className="content">
                        <p>Temperatura: {temp}&deg;</p>
                        <p>Ciśnienie: {pressure} hPa</p> 
                        <p>Wiatr: {wind} km/h</p>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ForecastDailyItem