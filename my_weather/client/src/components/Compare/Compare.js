import React from 'react'
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';
import CalCelsius from '../Functions/CalCelsius';
import CalWindSpeed from '../Functions/CalWindSpeed';
import CompareCurrentWeatherItem from './CompareCurrentWeatherItem'
import './Compare.css';
import CompareForecastItem from './CompareForecastItem';

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
            forecastDailyElementsOWM:[
            ],
            forecastDailyElementsOther:[
            ],
            source:"OpenWeatherMap",
            city:undefined,
            lat:undefined,
            lon:undefined,
            currentProperty:undefined,
            OWMProperty:undefined,
            OtherProperty:undefined,
            weatherComp:undefined,
            tempComp:undefined,
            pressureComp:undefined,
            windComp:undefined,
            error:false
        }
    }
    nextOWMProperty = () => {
        const newIndex = this.state.OWMProperty.id +1
        this.setState({
            OWMProperty: this.state.forecastDailyElementsOWM[newIndex]
        })
        console.log(newIndex)
    }
    prevOWMProperty= () => {
        const newIndex = this.state.OWMProperty.id -1
        this.setState({
            OWMProperty: this.state.forecastDailyElementsOWM[newIndex]
        })
    }
    nextOtherProperty = () => {
        const newIndex = this.state.OtherProperty.id +1
        this.setState({
            OtherProperty: this.state.forecastDailyElementsOther[newIndex]
        })
        console.log(newIndex)
    }
    prevOtherProperty= () => {
        const newIndex = this.state.OtherProperty.id -1
        this.setState({
            OtherProperty: this.state.forecastDailyElementsOther[newIndex]
        })
    }
    setOpenWeatherMap = () => {
        this.setState({
            source:"OpenWeatherMap"
        })
    }
    setWeatherApi = () => {
        this.setState({
            source:"WeatherApi"
        })
        this.getForecastDailyWA(this.state.city)
    }
    setTomorrowIO = () => {
        this.setState({
            source:"TomorrowIO"
        })
        this.getForecastDailyTI(this.state.lat,this.state.lon)
    }
    setVisualCrossing = () => {
        this.setState({
            source:"VisualCrossing"
        })
        this.getForecastDailyVC(this.state.city)
    }
    setWeatherbit = () => {
        this.setState({
            source:"Weatherbit"
        })
        this.getForecastDailyWB(this.state.city)
    }

    getWeatherOpenweathermap = (e) =>{
        e.preventDefault()
        
        this.state.compareCurrentElements.length=0

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
            this.getForecastDailyOWM(response.coord.lat,response.coord.lon)
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
                    'image':weatherIcons[response.weather[0].id],
                    'source':"OpenWeatherMap"
                }],
                city:response.name,
                lat:response.coord.lat,
                lon:response.coord.lon,
                weatherComp:response.weather[0].description,
                tempComp:CalCelsius(response.main.temp),
                pressureComp:response.main.pressure,
                windComp:CalWindSpeed(response.wind.speed),
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
    getForecastDailyOWM = (lat,lon)=>{

        console.log(lat)
        this.state.forecastDailyElementsOWM.length=0
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pl&appid=${API_key_OWM}`)
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
                    forecastDailyElementsOWM:[...this.state.forecastDailyElementsOWM,{
                        'id':i,
                        'date':CalDate(response.daily[i].dt),
                        'weather':response.daily[i].weather[0].description,
                        'tempMax':CalCelsius(response.daily[i].temp.max),
                        'tempMin':CalCelsius(response.daily[i].temp.min),
                        'pressure':response.daily[i].pressure,
                        'wind':CalWindSpeed(response.daily[i].wind_speed),
                        'image':weatherIcons[response.daily[i].weather[0].id],
                        'clouds':response.daily[i].clouds,
                        'humidity':response.daily[i].humidity,
                    }],  
                })
            }  
            this.setState({
                OWMProperty:this.state.forecastDailyElementsOWM[1]
            }) 
          })
    }
    getWeatherWeatherApi = (city) =>{
            
        fetch(`http://api.weatherapi.com/v1/current.json?key=${API_key_WA}&q=${city}&days=7&aqi=yes&alerts=yes&lang=pl
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
                    'image':weatherIcons[response.current.condition.code],
                    'source':"WeatherApi"
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
    getForecastDailyWA = (city) =>{

        this.state.forecastDailyElementsOther.length=0
            
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_key_WA}&q=${city}&days=4&aqi=yes&alerts=yes&lang=pl
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
            for (var i = 0; i < 3; i++) {
            this.setState({
                forecastDailyElementsOther:[...this.state.forecastDailyElementsOther,{
                    'id':i,
                    'date':response.forecast.forecastday[i].date,
                    'weather':response.forecast.forecastday[i].day.condition.text,
                    'tempMax':response.forecast.forecastday[i].day.maxtemp_c,
                    'tempMin':response.forecast.forecastday[i].day.mintemp_c,
                    'pressure':"-",
                    'wind':"-",
                    'image':weatherIcons[response.forecast.forecastday[i].day.condition.code],
                    'clouds':"-",
                    'humidity':response.forecast.forecastday[i].day.avghumidity,
                }],
            })
            }
            this.setState({
                OtherProperty:this.state.forecastDailyElementsOther[1]
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
        this.state.forecastDailyElementsOther.length=0
            
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
                    'weather':weatherConditions[response.data.timelines[0].intervals[0].values.weatherCode],
                    'temp':response.data.timelines[0].intervals[0].values.temperature,
                    'pressure':response.data.timelines[0].intervals[0].values.pressureSurfaceLevel,
                    'wind':CalWindSpeed(response.data.timelines[0].intervals[0].values.windSpeed),
                    'image':weatherIcons[response.data.timelines[0].intervals[0].values.weatherCode],
                    'source':"TommorowIo"
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
    getForecastDailyTI = (lat,lon) =>{
        this.state.forecastDailyElementsOther.length=0
            
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
            for (var i = 0; i < 8; i++) {
                this.setState({
                    forecastDailyElementsOther:[...this.state.forecastDailyElementsOther,{
                        'id':i,
                        'date':response.data.timelines[0].intervals[i].startTime,
                        'weather':weatherConditions[response.data.timelines[0].intervals[i].values.weatherCode],
                        'tempMax':response.data.timelines[0].intervals[i].values.temperature,
                        'tempMin':response.data.timelines[0].intervals[i].values.temperature,
                        'pressure':response.data.timelines[0].intervals[i].values.pressureSurfaceLevel,
                        'wind':response.data.timelines[0].intervals[i].values.windSpeed,
                        'image':weatherIcons[response.data.timelines[0].intervals[i].values.weatherCode],
                        'clouds':response.data.timelines[0].intervals[i].values.cloudCover,
                        'humidity':response.data.timelines[0].intervals[i].values.humidity,
                    }],  
                })
            }  
            this.setState({
                OtherProperty:this.state.forecastDailyElementsOther[1]
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
    getWeatherVisualcrossing = (city) =>{

        this.state.forecastDailyElementsOther.length=0
            
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=metric&locationMode=single&iconSet=icons2&key=LHKNDUGQ4MSQTL5749JVGX4XV&dataElements=default&locations=${city}
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
                    'source':"VisualCrossing"
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
    getForecastDailyVC = (city) =>{

        this.state.forecastDailyElementsOther.length=0
            
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&combinationMethod=aggregate&contentType=json&unitGroup=metric&locationMode=single&iconSet=icons2&key=LHKNDUGQ4MSQTL5749JVGX4XV&dataElements=default&locations=${city}
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
            for (var i = 0; i < 8; i++) {
                this.setState({
                    forecastDailyElementsOther:[...this.state.forecastDailyElementsOther,{
                        'id':i,
                        'date':CalDate(response.location.values[i].datetime),
                        'weather':response.location.values[i].conditions,
                        'tempMax':response.location.values[i].maxt,
                        'tempMin':response.location.values[i].mint,
                        'pressure':"-",
                        'wind':1.6*response.location.values[i].wspd,
                        'image':"-",
                        'clouds':response.location.values[i].cloudcover,
                        'humidity':response.location.values[i].humidity,
                    }],  
                })
            }  
            this.setState({
                OtherProperty:this.state.forecastDailyElementsOther[1]
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

        this.state.forecastDailyElementsOther.length=0
            
        fetch(` https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=pl&key=${API_key_w}
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
                    'temp':response.data[0].temp,
                    'pressure':Math.floor(response.data[0].pres),
                    'wind':Math.floor(1.609*response.data[0].wind_spd),
                    'image':weatherIcons[response.data[0].weather.code],
                    'source':"Weatherbit"
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
    getForecastDailyWB = (city) =>{

        this.state.forecastDailyElementsOther.length=0
            
        fetch(` https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&lang=pl&key=${API_key_w}
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
            for (var i = 0; i < 8; i++) {
                this.setState({
                    forecastDailyElementsOther:[...this.state.forecastDailyElementsOther,{
                        'id':i,
                        'date':response.data[i].datetime,
                        'weather':response.data[i].weather.description,
                        'tempMax':response.data[i].max_temp,
                        'tempMin':response.data[i].min_temp,
                        'pressure':response.data[i].pres,
                        'wind':Math.floor(1.609*response.data[i].wind_spd),
                        'image':weatherIcons[response.data[i].weather.code],
                        'clouds':response.data[i].clouds,
                        'humidity':"-",
                    }],  
                })
            }  
            this.setState({
                OtherProperty:this.state.forecastDailyElementsOther[1]
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
    render(){
        if(this.state.source=="OpenWeatherMap"){
            return( <div>
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
                            {this.state.compareCurrentElements.map(fde => <CompareCurrentWeatherItem compare={this.state} key={fde.id} element={fde} />)}
                        </div>
                        
                    </div>
                    ):null}
                </div>
                <button 
                onClick={() => this.setOpenWeatherMap()} 
                >OpenWeatherMap
                </button>
                <button 
                onClick={() => this.setWeatherApi()} 
                >WeatherApi
                </button>
                <button 
                onClick={() => this.setTomorrowIO()} 
                >TommorowIO
                </button>
                <button 
                onClick={() => this.setVisualCrossing()} 
                >VisualCrossing
                </button>
                <button 
                onClick={() => this.setWeatherbit()} 
                >Weatherbit
                </button>
                <div className="compare-main">
                {this.state.OWMProperty ?(
                <div className="main-cards">  
                <button className="left" 
                                onClick={() => this.nextOWMProperty()} 
                                disabled={this.state.OWMProperty.id === this.state.forecastDailyElementsOWM.length-3}
                            >Next
                            </button>
                            <button className="right"
                                    onClick={() => this.prevOWMProperty()} 
                                    disabled={this.state.OWMProperty.id === 1}
                            >Prev
                            </button>
                
                                <div className="cards-slider">         
                                    <div className="cards-slider-wrapper" style={{
                                                                            'transform':`translateX(-${this.state.OWMProperty.id*(100/this.state.forecastDailyElementsOWM.length)}%)`
                                    }}>
                                        {this.state.forecastDailyElementsOWM.map(fde => <CompareForecastItem key={fde.id} element={fde} />)}
                                    </div>
                                </div>
                                
                            </div>
                            ):null}
                </div>
            </div>
            )
        }
        if(this.state.source=="WeatherApi"){
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
                            {this.state.compareCurrentElements.map(fde => <CompareCurrentWeatherItem compare={this.state} key={fde.id} element={fde} />)}
                        </div>
                        
                    </div>
                    ):null}
                </div>
                <button 
                onClick={() => this.setOpenWeatherMap()} 
                >OpenWeatherMap
                </button>
                <button 
                onClick={() => this.setWeatherApi()} 
                >WeatherApi
                </button>
                <button 
                onClick={() => this.setTomorrowIO()} 
                >TommorowIO
                </button>
                <button 
                onClick={() => this.setVisualCrossing()} 
                >VisualCrossing
                </button>
                <button 
                onClick={() => this.setWeatherbit()} 
                >Weatherbit
                </button>
                    <div className="compare-main">
                {this.state.OtherProperty ?(
                <div className="main-cards"> 
                
                                <div className="cards-slider">         
                                    <div className="cards-slider-wrapper" style={{
                                                                            'transform':`translateX(-${this.state.OtherProperty.id*(100/this.state.forecastDailyElementsOther.length)}%)`
                                    }}>
                                        {this.state.forecastDailyElementsOther.map(fde => <CompareForecastItem key={fde.id} element={fde} />)}
                                    </div>
                                </div>
                                
                            </div>
                            ):null}
                </div>
                </div>
            )
        }
        if(this.state.source=="TomorrowIO"){
            return( <div>
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
                            {this.state.compareCurrentElements.map(fde => <CompareCurrentWeatherItem compare={this.state} key={fde.id} element={fde} />)}
                        </div>
                        
                    </div>
                    ):null}
                </div>
                <button 
                onClick={() => this.setOpenWeatherMap()} 
                >OpenWeatherMap
                </button>
                <button 
                onClick={() => this.setWeatherApi()} 
                >WeatherApi
                </button>
                <button 
                onClick={() => this.setTomorrowIO()} 
                >TommorowIO
                </button>
                <button 
                onClick={() => this.setVisualCrossing()} 
                >VisualCrossing
                </button>
                <button 
                onClick={() => this.setWeatherbit()} 
                >Weatherbit
                </button>
                <div className="compare-main">
                {this.state.OtherProperty ?(
                <div className="main-cards"> 
                <button className="left" 
                                onClick={() => this.nextOtherProperty()} 
                                disabled={this.state.OtherProperty.id === this.state.forecastDailyElementsOther.length-3}
                            >Next
                            </button>
                            <button className="right"
                                    onClick={() => this.prevOtherProperty()} 
                                    disabled={this.state.OtherProperty.id === 1}
                            >Prev
                            </button>
                                <div className="cards-slider">         
                                    <div className="cards-slider-wrapper" style={{
                                                                            'transform':`translateX(-${this.state.OtherProperty.id*(100/this.state.forecastDailyElementsOther.length)}%)`
                                    }}>
                                        {this.state.forecastDailyElementsOther.map(fde => <CompareForecastItem key={fde.id} element={fde} />)}
                                    </div>
                                </div>
                                
                            </div>
                            ):null}
                </div>
            </div>
            )
        }
        if(this.state.source=="VisualCrossing"){
            return( <div>
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
                            {this.state.compareCurrentElements.map(fde => <CompareCurrentWeatherItem compare={this.state} key={fde.id} element={fde} />)}
                        </div>
                        
                    </div>
                    ):null}
                </div>
                <button 
                onClick={() => this.setOpenWeatherMap()} 
                >OpenWeatherMap
                </button>
                <button 
                onClick={() => this.setWeatherApi()} 
                >WeatherApi
                </button>
                <button 
                onClick={() => this.setTomorrowIO()} 
                >TommorowIO
                </button>
                <button 
                onClick={() => this.setVisualCrossing()} 
                >VisualCrossing
                </button>
                <button 
                onClick={() => this.setWeatherbit()} 
                >Weatherbit
                </button>
                <div className="compare-main">
                {this.state.OtherProperty ?(
                <div className="main-cards"> 
                 <button className="left" 
                                onClick={() => this.nextOtherProperty()} 
                                disabled={this.state.OtherProperty.id === this.state.forecastDailyElementsOther.length-3}
                            >Next
                            </button>
                            <button className="right"
                                    onClick={() => this.prevOtherProperty()} 
                                    disabled={this.state.OtherProperty.id === 1}
                            >Prev
                            </button>
                                <div className="cards-slider">         
                                    <div className="cards-slider-wrapper" style={{
                                                                            'transform':`translateX(-${this.state.OtherProperty.id*(100/this.state.forecastDailyElementsOther.length)}%)`
                                    }}>
                                        {this.state.forecastDailyElementsOther.map(fde => <CompareForecastItem key={fde.id} element={fde} />)}
                                    </div>
                                </div>
                                
                            </div>
                            ):null}
                </div>
            </div>
            )
        }
        if(this.state.source=="Weatherbit"){
            return( <div>
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
                            {this.state.compareCurrentElements.map(fde => <CompareCurrentWeatherItem compare={this.state} key={fde.id} element={fde} />)}
                        </div>
                        
                    </div>
                    ):null}
                </div>
                <button 
                onClick={() => this.setOpenWeatherMap()} 
                >OpenWeatherMap
                </button>
                <button 
                onClick={() => this.setWeatherApi()} 
                >WeatherApi
                </button>
                <button 
                onClick={() => this.setTomorrowIO()} 
                >TommorowIO
                </button>
                <button 
                onClick={() => this.setVisualCrossing()} 
                >VisualCrossing
                </button>
                <button 
                onClick={() => this.setWeatherbit()} 
                >Weatherbit
                </button>
                <div className="compare-main">
                {this.state.OtherProperty ?(
                <div className="main-cards"> 
                <button className="left" 
                                onClick={() => this.nextOtherProperty()} 
                                disabled={this.state.OtherProperty.id === this.state.forecastDailyElementsOther.length-3}
                            >Next
                            </button>
                            <button className="right"
                                    onClick={() => this.prevOtherProperty()} 
                                    disabled={this.state.OtherProperty.id === 1}
                            >Prev
                            </button>
                                <div className="cards-slider">         
                                    <div className="cards-slider-wrapper" style={{
                                                                            'transform':`translateX(-${this.state.OtherProperty.id*(100/this.state.forecastDailyElementsOther.length)}%)`
                                    }}>
                                        {this.state.forecastDailyElementsOther.map(fde => <CompareForecastItem key={fde.id} element={fde} />)}
                                    </div>
                                </div>
                                
                            </div>
                            ):null}
                </div>
            </div>
            )
        }
        
    }
}
const weatherIcons = {
    200:'/images/200.png',
    201:'/images/201.png',
    202:'/images/202.png',
    210:'/images/210.png',
    211:'/images/211.png',
    212:'/images/212.png',
    221:'/images/212.png',
    230:'/images/230D.png',
    231:'/images/231.png',
    232:'/images/232.png',
    300:'/images/300D.png',
    301:'/images/301.png',
    302:'/images/302.png',
    310:'/images/310D.png',
    311:'/images/311.png',
    312:'/images/312.png',
    313:'/images/313_1.png',
    314:'/images/314.png',
    321:'/images/321.png',
    500:'/images/500D.png',
    501:'/images/501.png',
    502:'/images/502.png',
    503:'/images/503.png',
    504:'/images/504.png',
    511:'/images/511.png',
    520:'/images/520D.png',
    521:'/images/521_2.png',
    522:'/images/522_1.png',
    531:'/images/522_1.png',
    600:'/images/600D.png',
    601:'/images/601.png',
    602:'/images/602.png',
    611:'/images/611.png',
    612:'/images/612D.png',
    613:'/images/613.png',
    615:'/images/615D.png',
    616:'/images/616.png',
    620:'/images/620D.png',
    621:'/images/621.png',
    622:'/images/622.png',
    701:'/images/701_2.png',
    711:'/images/701_2.png',
    721:'/images/701_2.png',
    731:'/images/701_2.png',
    741:'/images/701_2.png',
    751:'/images/701_2.png',
    761:'/images/701_2.png',
    762:'/images/701_2.png',
    771:'/images/701_2.png',
    781:'/images/701_2.png',
    800:'/images/800D.png',
    801:'/images/801D.png',
    802:'/images/802D.png',
    803:'/images/803D.png',
    804:'/images/804.png',
    1000:'/images/800D.png',
    1003:'/images/801D.png',
    1006:'/images/802D.png',
    1009:'/images/804.png',
    1030:'/images/701_2.png',
    1063:'/images/500D.png',
    1066:'/images/600.png',
    1069:'/images/613.png',
    1072:'/images/511.png',
    1087:'/images/200.png',
    1114:'/images/602.png',
    1117:'/images/622.png',
    1135:'/images/702_1.png',
    1147:'/images/702_1.png',
    1150:'/images/300D.png',
    1153:'/images/301.png',
    1168:'/images/511.png',
    1171:'/images/501.png',
    1180:'/images/502.png',
    1183:'/images/500D.png',
    1186:'/images/500D.png',
    1189:'/images/501.png',
    1192:'/images/502.png',
    1195:'/images/503.png',
    1198:'/images/511.png',
    1201:'/images/511.png',
    1204:'/images/611.png',
    1207:'/images/612D.png',
    1210:'/images/600D.png',
    1213:'/images/600D.png',
    1216:'/images/601.png',
    1219:'/images/601.png',
    1222:'/images/602.png',
    1225:'/images/602.png',
    1237:'/images/511.png',
    1240:'/images/520.png',
    1243:'/images/521_2.png',
    1246:'/images/522_1.png',
    1249:'/images/612D.png',
    1252:'/images/613.png',
    1255:'/images/612D.png',
    1258:'/images/613.png',
    1261:'/images/511.png',
    1264:'/images/511.png',
    1273:'/images/200.png',
    1276:'/images/201.png',
    1279:'/images/602.png',
    1282:'/images/602.png',
    4201:'/images/502.png',
    4001:'/images/501.png',
    4200:'/images/500D.png',
    6201:'/images/511.png',
    6001:'/images/511.png',
    6200:'/images/511.png',
    6000:'/images/511.png',
    4000:'/images/301.png',
    7101:'/images/511.png',
    7000:'/images/511.png',
    7102:'/images/511.png',
    5101:'/images/602.png',
    5000:'/images/601.png',
    5100:'/images/600D.png',
    5001:'/images/601.png',
    8000:'/images/201.png',
    2100:'/images/701_2.png',
    2000:'/images/701_2.png',
    1001:'/images/804.png',
    1102:'/images/803D.png',
    1101:'/images/802D.png',
    1100:'/images/801D.png',
    1000:'/images/800D.png',
}
const weatherConditions = {
    4201:'Duży deszcz',
    4001:'Deszcz',
    4200:'Lekki Deszcz',
    6201:'Duży Marznący Deszcz',
    6001:'Marznący Deszcz',
    6200:'Lekki Marznący Deszcz',
    6000:'Marznąca Mrzawka',
    4000:'Mrzawka',
    7101:'Duże Krupy',
    7000:'Krupy',
    7102:'Lekkie Krupy',
    5101:'Duży Śnieg',
    5000:'Śnieg',
    5100:'Lekki Śnieg',
    5001:'Zamieć',
    8000:'Burza',
    2100:'Lekka Mgła',
    2000:'Mgła',
    1001:'Pochmurnie',
    1102:'Przewaga Chmur',
    1101:'Częściowe Zachmurzenie',
    1100:'Przeważnie Słonecznie',
    1000:'Słonecznie',
}
export default Compare