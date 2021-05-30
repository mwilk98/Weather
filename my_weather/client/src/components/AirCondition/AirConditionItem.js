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
        error} = props.air

        let content = null
        

        if(!error && city){
            content = (
                <div className="weatherCard">
                    <div className="card" >
                        <div className="face face1">
                            <div className="content">
                                <p>{city}</p>
                                <p>{country}</p>
                                <p>{date}</p>
                                <p>{time}</p>
                                <p>{aqi}</p>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <p>{co}</p>
                            <p>{nh3}</p>
                            <p>{no}</p>
                            <p>{no2}</p>
                            <p>{o3}</p>
                            <p>{pm2_5}</p>
                            <p>{pm10}</p>
                            <p>{so2}</p>  
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

    const weatherIcons = {
        1:'/images/clouds.png',
        2:'/images/sunrise.png',
        3:'/images/sunset.png',
        4:'/images/humidity.png',
        5:'/images/temp.webp',
        6:'/images/pressure.png',
        7:'/images/wind.png',
    }
export default AirConditionItem