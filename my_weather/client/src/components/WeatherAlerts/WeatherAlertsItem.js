import React from 'react'
const WeatherAlertsItem = props => {
    const{
        city,
        country,
        date,
        time,
        description,  
        error} = props.alert

        let content = null
        

        if(!error && city){
            content = (
                <div className="alertCard">
                    <div className="card" >
                        <div className="face face1">
                            <div className="content">
                                <p>{city}</p>
                                <p>{country}</p>
                                <p>{date}</p>
                                <p>{time}</p> 
                                <p>{description}</p> 
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    return (<div className="alertCard">
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
export default WeatherAlertsItem