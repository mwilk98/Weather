import React from 'react'
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';
import CalCelsius from '../Functions/CalCelsius';
import CalWindSpeed from '../Functions/CalWindSpeed';
import CompareCurrentWeatherItem from './CompareCurrentWeatherItem'
import './Compare.css';

const API_key_OWM="157d33f8987d245bc6a1997408e90015"
const API_key_WA = "d42d0d989ead4316b9d143558213105"
const API_key_w = "4c7c27f8abf34ae09c61bad9a897be7e"
class Compare extends React.Component{
    constructor(props){
        super(props)
        this.state={
            value:"",
            compareCurrentElements:[
            ],
            currentProperty:undefined,
            error:false
        }
    }
    nextCurrentProperty = () => {
        const newIndex = this.state.currentProperty.id +1
        this.setState({
            currentProperty: this.state.compareCurrentElements[newIndex]
        })
        console.log(newIndex)
    }

    prevCurrentProperty = () => {
        const newIndex = this.state.currentProperty.id -1
        this.setState({
            currentProperty: this.state.compareCurrentElements[newIndex]
        })
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
            console.log(response)
            this.getWeatherWeatherApi(this.state.value)
            this.getWeatherTommorowIo(response.coord.lat,response.coord.lon)
            this.getWeatherVisualcrossing(this.state.value)
            this.getWeatherWeatherbit(this.state.value)
            this.setState({
                compareCurrentElements:[...this.state.compareCurrentElements,{
                    'id':1,
                    'date':CalDate(response.dt),
                    'weather':response.weather[0].description,
                    'temp':CalCelsius(response.main.temp),
                    'pressure':response.main.pressure,
                    'wind':CalWindSpeed(response.wind.speed),
                    'image':weatherIcons[0],
                }],
            })
            this.setState({
                currentProperty:this.state.compareCurrentElements[0]
            }) 
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
            console.log(response)
            this.setState({
                compareCurrentElements:[...this.state.compareCurrentElements,{
                    'id':2,
                    'date':response.current.last_updated,
                    'weather':response.current.condition.text,
                    'temp':response.current.temp_c,
                    'pressure':response.current.pressure_mb,
                    'wind':response.current.wind_kph,
                    'image':weatherIcons[0],
                }],
            })
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
            console.log(response)
            this.setState({
                compareCurrentElements:[...this.state.compareCurrentElements,{
                    'id':3,
                    'date':response.data.timelines[0].startTime,
                    'weather':response.data.timelines[0].intervals[0].values.weatherCode,
                    'temp':response.data.timelines[0].intervals[0].values.temperature,
                    'pressure':response.data.timelines[0].intervals[0].values.pressureSurfaceLevel,
                    'wind':CalWindSpeed(response.data.timelines[0].intervals[0].values.windSpeed),
                    'image':weatherIcons[0],
                }],
            })
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
            console.log(response)
            this.setState({
                compareCurrentElements:[...this.state.compareCurrentElements,{
                    'id':4,
                    'date':response.location.currentConditions.datetime,
                    'weather':response.location.currentConditions.icon,
                    'temp':response.location.currentConditions.temp,
                    'pressure':response.location.currentConditions.sealevelpressure,
                    'wind':response.location.currentConditions.wspd,
                    'image':weatherIcons[0],
                }],
            })
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

        this.state.compareCurrentElements.length=0
            
        fetch(` https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${API_key_w}
        `)
        .then(response => {
            if(response.ok){
                return response
            }
            throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
            this.setState({
                compareCurrentElements:[...this.state.compareCurrentElements,{
                    'id':5,
                    'date':response.data[0].ob_time,
                    'weather':response.data[0].weather.description,
                    'temp':response.data[0].app_temp,
                    'pressure':response.data[0].pres,
                    'wind':20*response.data[0].wind_spd,
                    'image':weatherIcons[0],
                }],
            })
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
                <div className="city-form">
                <Form 
                value={this.state.value}  
                handler={this.inputHandler}
                submit={this.getWeatherOpenweathermap}
                /> 
                </div>
                <div className="compare-main-cards">
                    {this.state.currentProperty ?( 
                    <div className="compare-cards-slider">
                        <div className="compare-cards-slider-wrapper" style={{
                            'transform':`translateX(-${this.state.currentProperty.id*(100/this.state.compareCurrentElements.length)}%)`
                        }}>
                            {this.state.compareCurrentElements.map(fde => <CompareCurrentWeatherItem key={fde.id} element={fde} />)}
                        </div>
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
export default Compare