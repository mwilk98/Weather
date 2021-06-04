import React from 'react'
const AirConditionItem = props => {
    const{
        city,
        country,
        date,
        time,
        aqi,
        co,
        nh3,
        no,
        no2,
        o3,
        pm2_5,
        pm10,
        so2,
        color,  
        error} = props.air

        let content = null
        

        if(!error && city){
            content = (
                <div className="airCard">
                    <div className="card" >
                        <div className="face face1"style={{ 
                        background: conditionColors[color]
                        }}>
                            <div className="content" >
                                <p>{city}</p>
                                <p>{country}</p>
                                <p>{date}</p>
                                <p>{time}</p>
                                <p>{aqi}</p>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <p>CO: {co} ({Math.floor((co/7000)*100)}%)</p>
                            <p>NH3: {nh3} ({Math.floor((nh3/1750)*100)}%)</p>
                            <p>NO: {no} ({Math.floor((no/200)*100)}%)</p>
                            <p>NO2: {no2} ({Math.floor((no2/100)*100)}%)</p>
                            <p>O3: {o3} ({Math.floor((o3/120)*100)}%)</p>
                            <p>PM2.5: {pm2_5} ({Math.floor((pm2_5/35)*100)}%)</p>
                            <p>PM10: {pm10} ({Math.floor((pm10/50)*100)}%)</p>
                            <p>SO2:{so2} ({Math.floor((so2/100)*100)}%)</p>  
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    return (<div className="weatherCard">
        {error ? `Brak danych dla podanego maista - ${city} nie istnieje lub zostało błędnie wpisane!` : content}

    </div>
    )}
    const conditionColors = {
        1:'green',
        2:'lightgreen',
        3:'yellow',
        4:'red',
        5:'purple',
    }
export default AirConditionItem