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
import { Line } from 'react-chartjs-2';



const API_key="157d33f8987d245bc6a1997408e90015"
//const localTime = new Date().toLocaleString()

class CurrentWeather extends React.Component
{
    constructor(props)
    {
        
        super(props)
        this.state=
        {
            value:"",
            city:"",
            country:"",
            aqi:undefined,
            pm2_5:undefined,
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
            content:undefined,
            forecastDailyElements:[],
            forecastHourlyElements:[],
            Property: undefined,
            hourlyProperty: undefined,
            forecast:true,
            error:false,
            tempData:[],
            tempPress:[],
            tempHumid:[],
            tempTime:[],
            data :{
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                  },
                ],
            },
            dataTemperature :{
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                  },
                ],
            },
            dataPressure :{
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                  },
                ],
            },
            dataHumiity :{
                labels: [],
                datasets: [
                  {
                    label: '',
                    data: [],
                    fill: false,
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderColor: 'rgba(0, 0, 0, 0)',
                  },
                ],
            },
            options : {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'black'
                        }
                    }
                },
                maintainAspectRatio: false,
                scales: {
                    y: {  
                        ticks: {
                          color: "black", 
                          font: {
                            size: 10,
                          },
                          stepSize: 1,
                          beginAtZero: true
                        }
                      },
                      x: { 
                        ticks: {
                          color: "black", 
                        
                          font: {
                            size: 14 
                          },
                          stepSize: 1,
                          beginAtZero: true
                        }
                    }
                },
            }
        }
    }

    
    nextProperty = (Property,Elements) => 
    {
        const newIndex = Property.id +1;

        this.setState(
        {
            Property: Elements[newIndex]
        });

        console.log(newIndex);
    };

    prevProperty= (Property,Elements) => 
    {
        const newIndex = Property.id -1;

        this.setState(
        {
            Property: Elements[newIndex]
        });
    };

    defaultWeather = (cityName) => 
    {
        this.setState(state =>(
        {
            city:cityName,
            error:false
        }))
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=pl&APPID=${API_key}`)
        .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
                throw Error("Błąd pobierania danych z API");
        })
        .then(response => response.json())
        .then(response => 
        {
            console.log(response)
            this.getForecastDaily(response.coord.lat,response.coord.lon)
            this.getForecastHourly(response.coord.lat,response.coord.lon)
            this.getAirQuality(response.coord.lat,response.coord.lon)
            this.setState(state =>(
            {
                city:state.city,
                country:response.sys.country,
                date:CalDate(response.dt,response.timezone),
                time:CalTime(response.dt,response.timezone),
                timezone:response.timezone,
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
                error:false,
            }))
            if(this.state.time>this.state.sunset){
                this.setState({
                    image:weatherIcons[response.weather[0].id+1000],
                })
            }
            console.log(this.state.image);
        })
        .catch(err =>
        {
            console.log(err)
            this.setState(prevState =>
            {
                return{
                error:true,
                city:prevState.city
            }})
        })
    };

    getWeather = (e) =>
    {
        
        e.preventDefault()
          
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&lang=pl&APPID=${API_key}`)
        .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
                throw Error("Błąd pobierania danych z API")
        })
        .then(response => response.json())
        .then(response => 
        {
            this.setState(state =>(
            {
                city:state.value,
                country:response.sys.country,
                timezone:response.timezone,
                date:CalDate(response.dt,response.timezone),
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
              this.getForecastDaily(response.coord.lat,response.coord.lon)
              this.getForecastHourly(response.coord.lat,response.coord.lon)
              this.getAirQuality(response.coord.lat,response.coord.lon)
        })
        .catch(err =>
        {
            console.log(err)
            this.setState(prevState =>
            {
                return{
                error:true,
                city:prevState.city
            }})
        })
    };

    getAirQuality(lat,lon)
    {
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`)
        .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
                throw Error("Błąd pobierania danych z API");
          })
        .then(response=> response.json())
        .then(response => 
        {
            this.setState(state =>(
            {
                aqi:airConditions[response.list[0].main.aqi],
                pm2_5:response.list[0].components.pm2_5,
                color:response.list[0].main.aqi,
                error:false
            }))
        })
        .catch(err =>
        {
            console.log(err)
            this.setState(prevState =>
            {
                return{
                error:true,
                city:prevState.city
            }})
        })
    };

    getForecastDaily = (lat,lon,typeF)=>
    {
        this.setState(
        {
            forecastDailyElements:[]
        })
        
        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pl&appid=${API_key}`)
        .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
                throw Error("Błąd pobierania danych z API");
        })
        .then(response => response.json())
        .then(response => 
        {
            for (var i = 0; i < 8; i++) 
            {
                this.setState(
                {
                    forecastDailyElements:[...this.state.forecastDailyElements,
                    {
                        'id':i,
                        'date':CalDate(response.daily[i].dt,this.state.timezone),
                        'weather':response.daily[i].weather[0].description,
                        'tempMax':CalCelsius(response.daily[i].temp.max),
                        'tempMin':CalCelsius(response.daily[i].temp.min),
                        'pressure':response.daily[i].pressure,
                        'wind':CalWindSpeed(response.daily[i].wind_speed),
                        'image':weatherIcons[response.daily[i].weather[0].id],
                        'clouds':response.daily[i].clouds,
                        'humidity':response.daily[i].humidity,
                        'sunrise':CalTime(response.daily[i].sunrise,response.timezone_offset) ,
                        'sunset':CalTime(response.daily[i].sunset,response.timezone_offset)
                    }],
                    
                })
            }
            this.setState(
            {
                Property:this.state.forecastDailyElements[0]
            })  
          })
    };

    getForecastHourly = (lat,lon)=>
    {
        this.setState(
        {
            forecastHourlyElements:[],
            tempData:[],
            tempTime:[],
            tempPress:[],
            tempHumid:[],
        })

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pl&appid=${API_key}`)
        .then(response => 
        {
            if(response.ok)
            {
                return response;
            }
                throw Error("Błąd pobierania danych z API");
        })
        .then(response => response.json())
        .then(response => 
        {
            for (var i = 0; i < 48; i++) 
            {
                this.setState(
                {
                    forecastHourlyElements:[...this.state.forecastHourlyElements,
                    {
                        'id':i,
                        'date':CalDate(response.hourly[i].dt,this.state.timezone),
                        'time':CalTime(response.hourly[i].dt,response.timezone_offset),
                        'weather':response.hourly[i].weather[0].description,
                        'temp':CalCelsius(response.hourly[i].temp),
                        'tempFeel':CalCelsius(response.hourly[i].feels_like),
                        'pressure':response.hourly[i].pressure,
                        'humidity':response.hourly[i].humidity,
                        'wind':CalWindSpeed(response.hourly[i].wind_speed),
                        'image':weatherIcons[response.hourly[i].weather[0].id],
                        'clouds':response.hourly[i].clouds,
                    }],
                    
                    tempData:[...this.state.tempData,CalCelsius(response.hourly[i].temp)],
                    tempTime:[...this.state.tempTime,CalTime(response.hourly[i].dt,response.timezone_offset)],
                    tempPress:[...this.state.tempPress,response.hourly[i].pressure],
                    tempHumid:[...this.state.tempHumid,response.hourly[i].humidity],
                    
                })
            this.setState(
            {
                Property:this.state.forecastHourlyElements[0],
            })
            }
            this.setState(
            {
                dataTemperature:{
                    labels: this.state.tempTime,
                    datasets: [
                    {
                        label: 'Temperatura:',
                        data: this.state.tempData,
                        fill: false,
                        backgroundColor: 'rgb(209, 157, 12)',
                        borderColor: 'rgb(0, 0, 0)',
                    },
                    ],
                },
                dataPressure:{
                    labels: this.state.tempTime,
                    datasets: [
                    {
                        label: 'Ciśnienie:',
                        data: this.state.tempPress,
                        fill: false,
                        backgroundColor: 'rgb(209, 157, 12)',
                        borderColor: 'rgb(0, 0, 0)',
                    },
                ],
                },
                dataHumiity:{
                    labels: this.state.tempTime,
                    datasets: [
                    {
                        label: 'Wilgotność:',
                        data: this.state.tempHumid,
                        fill: false,
                        backgroundColor: 'rgb(209, 157, 12)',
                        borderColor: 'rgb(0, 0, 0)',
                    },
                ],
                }
                
            })
            this.setState(
            {
                data:this.state.dataTemperature
            })
          })
    };

    inputHandler=(e)=>
    {
        this.setState(
            {
            value:e.target.value
        })
    };

    componentDidMount()
    {
        this.defaultWeather("Warszawa")
    };

    setForecast=()=>
    {
        if(this.state.forecast)
        {
            this.setState(
            {
                forecast:false,
                Property:this.state.forecastHourlyElements[0]
            })
        }
        else
        {
            this.setState(
            {
                forecast:true,
                Property:this.state.forecastDailyElements[0]
            })
        }
    };

    selectData = (chartDataSource) => {
        if(chartDataSource==1)
        {
            this.setState({
                data:this.state.dataTemperature
            })
        }
        if(chartDataSource==2)
        {
            this.setState({
                data:this.state.dataPressure
            })
        }
        if(chartDataSource==3)
        {
            this.setState({
                data:this.state.dataHumiity
            })
        }
    };

    render()
    {
        
        if(this.state.forecast)
        {
            this.state.content = (
                this.state.forecastDailyElements.map(fde => <ForecastDailyItem key={fde.id} element={fde} />)
            )
        }else{
            this.state.content = (
                this.state.forecastHourlyElements.map(fde => <ForecastHourlyItem key={fde.id} element={fde} />)
            )
        }
            return(
                    <div className="main"   style={
                                            { 
                                                backgroundImage: `url("/images/bg.jpg")` 
                                            }
                    }>
                        <div className="city-form">
                            <h1>Wyszukaj miasto dla którego chcesz sprawdzić obecne warunki pogodowe oraz prognozy pogody</h1>
                            <Form 
                                value={this.state.value}  
                                handler={this.inputHandler}
                                submit={this.getWeather}
                            /> 
                        </div> 
                        <div className="current-main">
                            {this.state.city ?(
                                <WeatherItem element={this.state} selectD={this.selectData}/>   
                            ):null}
                        </div>
                        <div className="forecast-main">
                            {this.state.Property ?( 
                                <div className="forecast-cards" >
                                    <button className="left"    style={
                                                                { 
                                                                backgroundImage: `url("/images/arrow_left.png")` 
                                                                }}
                                            onClick={() => this.prevProperty(this.state.Property,this.state.forecastDailyElements)} 
                                            disabled={this.state.Property.id === 0}
                                    >
                                    </button>
                                    <button className="swap-button"
                                        onClick={() => this.setForecast()} 
                                    >
                                        GODZINOWA
                                    </button>
                                    <button className="right"   style={
                                                                { 
                                                                    backgroundImage: `url("/images/arrow_right.png")` 
                                                                }}
                                            onClick={() => this.nextProperty(this.state.Property,this.state.forecastDailyElements)} 
                                            disabled={this.state.Property.id === this.state.forecastDailyElements.length-3}
                                        >
                                    </button>
                                    <div className="main-cards">  
                                        <div className="cards-slider">         
                                            <div className="cards-slider-wrapper"   style={
                                                                                    {
                                                                                        'transform':`translateX(-${this.state.Property.id*(100/this.state.forecastDailyElements.length)}%)`
                                                                                    }
                                            }>
                                                {this.state.content}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ):null}
                        </div>
                    </div>
                )
        }
};

const weatherIcons = 
{
    200:'/images/200.png',
    201:'/images/201.png',
    202:'/images/202.png',
    210:'/images/210.png',
    211:'/images/211.png',
    212:'/images/212.png',
    221:'/images/212.png',
    230:'/images/230D.png',
    1230:'/images/230N.png',
    231:'/images/231.png',
    232:'/images/232.png',
    300:'/images/300D.png',
    1300:'/images/300N.png',
    301:'/images/301.png',
    302:'/images/302.png',
    310:'/images/310D.png',
    1310:'/images/310N.png',
    311:'/images/311.png',
    312:'/images/312.png',
    313:'/images/313_1.png',
    314:'/images/314.png',
    321:'/images/321.png',
    500:'/images/500D.png',
    1500:'/images/500N.png',
    501:'/images/501.png',
    502:'/images/502.png',
    503:'/images/503.png',
    504:'/images/504.png',
    511:'/images/511.png',
    520:'/images/520D.png',
    1520:'/images/520N_1.png',
    521:'/images/521_2.png',
    522:'/images/522_1.png',
    531:'/images/522_1.png',
    600:'/images/600D.png',
    1600:'/images/600N.png',
    601:'/images/601.png',
    602:'/images/602.png',
    611:'/images/611.png',
    612:'/images/612D.png',
    1612:'/images/612N.png',
    613:'/images/613.png',
    615:'/images/615D.png',
    1615:'/images/615N.png',
    616:'/images/616.png',
    620:'/images/620D.png',
    1620:'/images/620N.png',
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
    1800:'/images/800N.png',
    801:'/images/801D.png',
    1801:'/images/801N.png',
    802:'/images/802D.png',
    1802:'/images/802N.png',
    803:'/images/803D.png',
    1803:'/images/803N.png',
    804:'/images/804.png',
};

const airConditions = 
{
    1:'Bardzo dobra',
    2:'Dobra',
    3:'Średnia',
    4:'Zła',
    5:'Bardzo zła',
};

export default CurrentWeather;