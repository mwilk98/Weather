import React from 'react'
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';
import WeatherAlertsItem from './WeatherAlertsItem'
import './WeatherAlerts.css';

const API_key="157d33f8987d245bc6a1997408e90015"


class WeatherAlerts extends React.Component{
    state={
        value:"",
        city:"",
        country:"",
        description:"",
        end:undefined,
        event:"",
        sender_name:"",
        start:undefined,
        error:false
    }
    getAir = (e) =>{
        
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
              this.setState(state =>({
                city:state.value,
                country:response.sys.country,
                date:CalDate(response.dt),
                time:CalTime(response.dt,response.timezone),
                lat:response.coord.lat,
                lon:response.coord.lon, 
                error:false
              }))
              fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${response.coord.lat}&lon=${response.coord.lon}&lang=pl&appid=${API_key}`)
          .then(response2 => {
              if(response2.ok){
                  return response2
              }
              throw Error("Błąd pobierania danych z API")
          })
          .then(response2 => response2.json())
          .then(response2 => {
              console.log(response2)
              if(response2.alerts){
                this.setState(state =>({
                        description:response2.alerts[0].description,
                        error:false
                      }))   
              }else{
                this.setState(state =>({
                        description:"brak alertów",
                        error:false
                      }))
              }
          })
          .catch(err =>{
            console.log(err)
            this.setState(prevState =>{
                return{
                error:true,
                city:prevState.city
            }})
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
    submitHandler=(e)=>{
        this.getAir(e)
    }
    render(){
        
        return(
            <div className="main"style={{ 
                backgroundImage: `url("/images/bg_alerts.png")` 
              }}>
                <div className="city-form">
                <Form 
                value={this.state.value}  
                handler={this.inputHandler}
                submit={this.submitHandler}
                /> 
                </div> 
                <div>
                <WeatherAlertsItem alert={this.state}/> 
                </div>
            </div>
            
        )
    }
}
export default WeatherAlerts