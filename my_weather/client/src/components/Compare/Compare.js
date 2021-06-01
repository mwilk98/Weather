import React from 'react'
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';
import CalCelsius from '../Functions/CalCelsius';
import CalWindSpeed from '../Functions/CalWindSpeed';

const API_key_OWM="157d33f8987d245bc6a1997408e90015"
const API_key_WA = "d42d0d989ead4316b9d143558213105"
const API_key_w = "4c7c27f8abf34ae09c61bad9a897be7e"
class Compare extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            error:false
        }
    }
    getWeatherOpenweathermap = (e) =>{
        e.preventDefault()
            
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&lang=pl&APPID=${API_key_OWM}`)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => {
            const localTime = new Date().toLocaleString()
            console.log(response)
            //this.getWeatherWeatherApi(this.state.value)
            //this.getWeatherTommorowIo(response.coord.lat,response.coord.lon)
            //this.getWeatherVisualcrossing(this.state.value)
            this.getWeatherWeatherbit(this.state.value)
            this.setState(state =>({
            city:state.value,
            country:response.sys.country,
            date:CalDate(response.dt),
            time:CalTime(response.dt,response.timezone),
            weather:response.weather[0].description,
            temp:CalCelsius(response.main.temp),
            tempMax:CalCelsius(response.main.temp_max),
            tempMin:CalCelsius(response.main.temp_min),
            tempFeel:CalCelsius(response.main.feels_like),
            pressure:response.main.pressure,
            wind:CalWindSpeed(response.wind.speed),
            image:weatherIcons[response.weather[0].id],
            lat:response.coord.lat,
            lon:response.coord.lon,
            clouds:response.clouds.all, 
            humidity:response.main.humidity,
            sunrise:CalTime(response.sys.sunrise,response.timezone),
            sunset:CalTime(response.sys.sunset,response.timezone),
            background:"/images/cloudyCity.jpg",
            error:false
            }))
        })
        .catch(err =>{
        console.log(err)
        this.setState(prevState =>{
            return{
            error:true,
            city:prevState.city
        }})
    })
    }
    getWeatherWeatherApi = (city) =>{
            
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_key_WA}&q=${city}&days=7&aqi=yes&alerts=yes
        `)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => {
            const localTime = new Date().toLocaleString()
            console.log(response)
            this.setState(state =>({
            city:state.value,
            error:false
            }))
        })
        .catch(err =>{
        console.log(err)
        this.setState(prevState =>{
            return{
            error:true,
            city:prevState.city
        }})
    })
    }
    getWeatherTommorowIo = (lat,lon) =>{
            
        fetch(`https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=temperature,humidity,windSpeed,cloudCover,weatherCode,pressureSurfaceLevel&timesteps=1d&units=metric&apikey=Xsa59kYGGrHiXs1TZ3cItU7zRZ4FfGQ8
        `)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => {
            const localTime = new Date().toLocaleString()
            console.log(response)
            this.setState(state =>({
            city:state.value,
            error:false
            }))
        })
        .catch(err =>{
        console.log(err)
        this.setState(prevState =>{
            return{
            error:true,
            city:prevState.city
        }})
    })
    }
    inputHandler=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
    getWeatherVisualcrossing = (city) =>{
            
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=metric&locationMode=single&key=LHKNDUGQ4MSQTL5749JVGX4XV&dataElements=default&locations=${city}
        `)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => {
            const localTime = new Date().toLocaleString()
            console.log(response)
            this.setState(state =>({
            city:state.value,
            error:false
            }))
        })
        .catch(err =>{
        console.log(err)
        this.setState(prevState =>{
            return{
            error:true,
            city:prevState.city
        }})
    })
    } 
    getWeatherWeatherbit = (city) =>{
            
        fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${API_key_w}
        `)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => {
            const localTime = new Date().toLocaleString()
            console.log(response)
            this.setState(state =>({
            city:state.value,
            error:false
            }))
        })
        .catch(err =>{
        console.log(err)
        this.setState(prevState =>{
            return{
            error:true,
            city:prevState.city
        }})
    })
    }  
    render(){
        return(
            <div>
                PORÓWNAJ PROGNOZY
                <div className="city-form">
                <Form 
                value={this.state.value}  
                handler={this.inputHandler}
                submit={this.getWeatherOpenweathermap}
                /> 
                </div>
            </div>

        
        )
    }
}
const weatherIcons = {
    200:'/images/thunderstorm.png',
    201:'/images/thunderstorm.png',
    202:'/images/thunderstorm.png',
    210:'/images/thunderstorm.png',
    211:'/images/thunderstorm.png',
    212:'/images/thunderstorm.png',
    221:'/images/thunderstorm.png',
    230:'/images/thunderstorm.png',
    231:'/images/thunderstorm.png',
    232:'/images/thunderstorm.png',
    300:'/images/drizzle.png',
    301:'/images/drizzle.png',
    302:'/images/drizzle.png',
    310:'/images/drizzle.png',
    311:'/images/drizzle.png',
    312:'/images/drizzle.png',
    313:'/images/drizzle.png',
    314:'/images/drizzle.png',
    321:'/images/drizzle.png',
    500:'/images/rain.png',
    501:'/images/rain.png',
    503:'/images/rain.png',
    504:'/images/rain.png',
    511:'/images/rain.png',
    520:'/images/rain.png',
    521:'/images/rain.png',
    522:'/images/rain.png',
    531:'/images/rain.png',
    500:'/images/rain.png',
    600:'/images/snow.png',
    601:'/images/snow.png',
    602:'/images/snow.png',
    611:'/images/snow.png',
    612:'/images/snow.png',
    613:'/images/snow.png',
    615:'/images/snow.png',
    616:'/images/snow.png',
    620:'/images/snow.png',
    621:'/images/snow.png',
    622:'/images/snow.png',
    701:'/images/mist.png',
    711:'/images/mist.png',
    721:'/images/mist.png',
    731:'/images/mist.png',
    741:'/images/mist.png',
    751:'/images/mist.png',
    761:'/images/mist.png',
    762:'/images/mist.png',
    771:'/images/mist.png',
    781:'/images/mist.png',
    800:'/images/clear.png',
    801:'/images/clouds.png',
    802:'/images/clouds.png',
    803:'/images/clouds.png',
    804:'/images/clouds.png',
}
export default Compare