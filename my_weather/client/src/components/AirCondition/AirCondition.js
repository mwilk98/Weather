import React from 'react'
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';
import AirConditionItem from './AirConditionItem'
import './AirCondition.css';

const API_key="157d33f8987d245bc6a1997408e90015"


class AirCondition extends React.Component{
    constructor(props){
        super(props)
        this.state={
        value:"",
        city:"",
        country:"",
        aqi:undefined,
        co:undefined,
        nh3:undefined,
        no:undefined,
        no2:undefined,
        o3:undefined,
        pm2_5:undefined,
        pm10:undefined,
        so2:undefined,
        error:false
        }
    }
    
    getAir = (e) =>{
        
        e.preventDefault()
          
          fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${API_key}`)
          .then(response => {
              if(response.ok){
                  return response
              }
              throw Error("Błąd pobierania danych z API")
          })
          .then(response => response.json())
          .then(response => {
              console.log(response)
              this.getAirQuality(response.coord.lat,response.coord.lon)
              this.setState(state =>({
                city:state.value,
                country:response.sys.country,
                date:CalDate(response.dt),
                time:CalTime(response.dt,response.timezone), 
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
    getAirQuality(lat,lon){
        fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_key}`)
          .then(response2 => {
              if(response2.ok){
                  return response2
              }
              throw Error("Błąd pobierania danych z API")
          })
          .then(response2 => response2.json())
          .then(response2 => {
              console.log(response2)
              this.setState(state =>({
                aqi:airConditions[ response2.list[0].main.aqi],
                co:response2.list[0].components.co,
                nh3:response2.list[0].components.nh3,
                no:response2.list[0].components.no,
                no2:response2.list[0].components.no2,
                o3:response2.list[0].components.o3,
                pm2_5:response2.list[0].components.pm2_5,
                pm10:response2.list[0].components.pm10,
                so2:response2.list[0].components.so2,
                color:response2.list[0].main.aqi,
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
    submitHandler=(e)=>{
        this.getAir(e)
    }
    render(){
        
        return(
            <div className="main"style={{ 
                backgroundImage: `url("/images/bg_air.jpg")` 
              }}>
                <div className="city-form">
                <h1>Wyszukaj miasto dla którego chcesz sprawdzić obecny stan powietrza</h1>
                <Form 
                value={this.state.value}  
                handler={this.inputHandler}
                submit={this.submitHandler}
                /> 
                </div> 
                <div>
                {this.state.city ?(
                    <AirConditionItem air={this.state}/>   
                ):null}
                </div>
                
                </div>

            
        )
    }
}
const airConditions = {
    1:'Bardzo dobra',
    2:'Dobra',
    3:'Średnia',
    4:'Zła',
    5:'Bardzo zła',
}
export default AirCondition