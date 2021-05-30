import React from 'react'
import WeatherItem from './WeatherItem';
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';
import CalCelsius from '../Functions/CalCelsius';
import CalWindSpeed from '../Functions/CalWindSpeed';
import ForecastDailyItem from './ForecastDailyItem';
import ForecastHourlyItem from './ForecastHourlyItem';
import './Forecast.css';
import './CurrentWeather.css';

const API_key="157d33f8987d245bc6a1997408e90015"
//const localTime = new Date().toLocaleString()

class CurrentWeather extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            city:"",
            country:"",
            image:undefined,
            background:undefined,
            weather:undefined,
            temp:undefined,
            tempMax:undefined,
            tempMin:undefined,
            tempFeel:undefined,
            pressurre:undefined,
            wind:undefined,
            lat:undefined,
            lon:undefined,
            clouds:undefined, 
            humidity:undefined,
            sunrise:undefined,
            sunset:undefined,
            background:undefined,
            forecastDailyElements:[
            ],
            forecastHourlyElements:[
            ],
            dailyProperty: undefined,
            hourlyProperty: undefined,
            error:false
        }
    }

    nextdailyProperty = () => {
        const newIndex = this.state.dailyProperty.id +1
        this.setState({
            dailyProperty: this.state.forecastDailyElements[newIndex]
        })
    }

    prevdailyProperty = () => {
        const newIndex = this.state.dailyProperty.id -1
        this.setState({
            dailyProperty: this.state.forecastDailyElements[newIndex]
        })
    }

    nextHourlyProperty = () => {
        const newIndex = this.state.hourlyProperty.id +1
        this.setState({
            hourlyProperty: this.state.forecastHourlyElements[newIndex]
        })
    }
    
    prevHourlyProperty = () => {
        const newIndex = this.state.hourlyProperty.id -1
        this.setState({
            hourlyProperty: this.state.forecastHourlyElements[newIndex]
        })
    }
    defaultWeather = () => {
        this.setState(state =>({
            city:"Warszawa",
            error:false
          }))
          fetch(`http://api.openweathermap.org/data/2.5/weather?q=warszawa&lang=pl&APPID=${API_key}`)
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
              this.getForecastDaily(response.coord.lat,response.coord.lon)
              this.getForecastHourly(response.coord.lat,response.coord.lon)
              this.setState(state =>({
                city:state.city,
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
    getWeather = (e) =>{
        
        e.preventDefault()
          
          fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&lang=pl&APPID=${API_key}`)
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
              this.getForecastDaily(response.coord.lat,response.coord.lon)
              this.getForecastHourly(response.coord.lat,response.coord.lon)
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
    getForecastDaily = (lat,lon)=>{

        console.log(lat)
        this.state.forecastDailyElements.length=0
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pl&appid=${API_key}`)
          .then(response => {
              if(response.ok){
                  return response
              }
              throw Error("Błąd pobierania danych z API")
          })
          .then(response => response.json())
          .then(response => {
              console.log(response)
              for (var i = 0; i < 8; i++) {
                this.setState({
                    forecastDailyElements:[...this.state.forecastDailyElements,{
                        'id':i,
                        'date':CalDate(response.daily[i].dt),
                        'weather':response.daily[i].weather[0].description,
                        'temp':CalCelsius(response.daily[i].temp.day),
                        'pressure':response.daily[i].pressure,
                        'wind':CalWindSpeed(response.daily[i].wind_speed),
                        'image':weatherIcons[response.daily[i].weather[0].id],
                        'background':"/images/download.gif",
                    }],
                    dailyProperty:this.state.forecastDailyElements[0]
                })
            }   
          })
    }
    getForecastHourly = (lat,lon)=>{

        this.state.forecastHourlyElements.length=0
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pl&appid=${API_key}`)
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
              for (var i = 0; i < 48; i++) {
                this.setState({
                    forecastHourlyElements:[...this.state.forecastHourlyElements,{
                        'id':i,
                        'date':CalDate(response.hourly[i].dt),
                        'time':CalTime(response.hourly[i].dt,response.timezone_offset),
                        'weather':response.hourly[i].weather[0].description,
                        'temp':CalCelsius(response.hourly[i].temp),
                        'pressure':response.hourly[i].pressure,
                        'wind':CalWindSpeed(response.hourly[i].wind_speed),
                        'image':weatherIcons[response.hourly[i].weather[0].id],
                    }],
                    hourlyProperty:this.state.forecastHourlyElements[0]
                })
            }
          })
    }
    inputHandler=(e)=>{
        this.setState({
            value:e.target.value
        })
    }
    componentDidMount(){
        this.defaultWeather()
     }
    render(){
        const {forecastDailyElements, forecastHourlyElements, dailyProperty, hourlyProperty}=this.state
        return(
            <div className="main" style={{ 
                backgroundImage: `url("/images/bg.jpg")` 
              }}>
                <div className="city-form">
                <Form 
                value={this.state.value}  
                handler={this.inputHandler}
                submit={this.getWeather}
                /> 
                </div> 
                <div>
                {this.state.city ?(
                    <WeatherItem weather={this.state}/>   
                ):null}
                </div>
                <div className="main-cards">
                    {dailyProperty ?( 
                    <div className="cards-slider">
                        <button className="left" 
                                onClick={() => this.nextdailyProperty()} 
                                disabled={dailyProperty.id === forecastDailyElements.length-1}
                                >Next
                        </button>
                        <div className="cards-slider-wrapper" style={{
                            'transform':`translateX(-${dailyProperty.id*(100/forecastDailyElements.length)}%)`
                        }}>
                            {forecastDailyElements.map(fde => <ForecastDailyItem key={fde.id} element={fde} />)}
                        </div>
                        <button className="right"
                                onClick={() => this.prevdailyProperty()} 
                                disabled={dailyProperty.id === 0}
                        >Prev
                        </button>
                    </div>
                    ):null}
                </div>
                <div className="main-cards">
                    {hourlyProperty ?( 
                    <div className="cards-slider">
                        <button className="left" 
                                onClick={() => this.nextHourlyProperty()} 
                                disabled={hourlyProperty.id === forecastHourlyElements.length-1}
                                >Next
                        </button>
                        <div className="cards-slider-wrapper" style={{
                            'transform':`translateX(-${hourlyProperty.id*(100/forecastHourlyElements.length)}%)`
                        }}>
                            {forecastHourlyElements.map(fde => <ForecastHourlyItem key={fde.id} element={fde} />)}
                        </div>
                        <button className="right"
                                onClick={() => this.prevHourlyProperty()} 
                                disabled={hourlyProperty.id === 0}
                        >Prev
                        </button>
                    </div>
                    ):null}
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
export default CurrentWeather