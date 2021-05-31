import React from 'react'

const ForecastDailyItem=({element})=>{
    const {id,city,weather} = element;
    return ( 
        <div className="weatherCard">
            <div className="card" >
                <div className="face face1">
                    <div className="content">
                        <h3>DZIENNA:</h3>
                        <p>{city}</p>
                    </div>
                </div>
                <div className="face face2">
                    <div className="content">
                        <p>Temperatura: {weather}</p>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ForecastDailyItem