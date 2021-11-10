import React from 'react'

const CompareCurrentWeatherItem=({element, compare })=>
{
    const
    {
        date,
        image,
        weather,
        temp,
        pressure,
        wind,
        source
    } = element;
    const
    {
        weatherComp,
        tempComp,
        pressureComp,
        windComp
    } = compare;

    return ( 
        <div className="compareCard">
            <div className="card" >
                <div className="face face1">
                    <div className="content">
                        <h3>{source}</h3>
                        <p>{date}</p>
                        <p><img src={image} width="100" height="100" alt="img"/></p>
                        <h3>{weather} </h3>
                        <h3>({weatherComp})</h3>
                    </div>
                </div>
                <div className="face face2">
                    <div className="content">
                        <p>Temperatura: {temp}&deg; ({tempComp}&deg;)</p>
                        <p>Ciśnienie: {pressure} hPa ({pressureComp}hPa)</p> 
                        <p>Wiatr: {wind} km/h ({windComp} km/h)</p>
                    </div>
                </div>
           </div>
        </div>
    )
};

export default CompareCurrentWeatherItem;