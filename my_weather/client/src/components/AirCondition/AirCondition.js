import React from 'react'
import Form from '../Form/Form'
import CalDate from '../Functions/CalDate';
import CalTime from '../Functions/CalTime';

const API_key="157d33f8987d245bc6a1997408e90015"


class AirCondition extends React.Component{

    state={
        value:"",
        city:"",
        country:"",
        lat:undefined,
        lon:undefined,
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
              fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${response.coord.lat}&lon=${response.coord.lon}&appid=${API_key}`)
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
                aqi:response2.list[0].main.aqi,
                co:response2.list[0].components.co,
                nh3:response2.list[0].components.nh3,
                no:response2.list[0].components.no,
                no2:response2.list[0].components.no2,
                o3:response2.list[0].components.o3,
                pm2_5:response2.list[0].components.pm2_5,
                pm10:response2.list[0].components.pm10,
                so2:response2.list[0].components.so2,
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
            <div >
                <h1>Stan Powietrza</h1>
                <div>
                <Form 
                value={this.state.value}  
                handler={this.inputHandler}
                submit={this.submitHandler}
                /> 
                </div> 
                <div>
                        <p>{this.state.city}</p>
                        <p>{this.state.country}</p>
                        <p>{this.state.date}</p>
                        <p>{this.state.time}</p>
                        <p>{this.state.aqi}</p>
                        <p>{this.state.co}</p>
                        <p>{this.state.nh3}</p>
                        <p>{this.state.no}</p>
                        <p>{this.state.no2}</p>
                        <p>{this.state.o3}</p>
                        <p>{this.state.pm2_5}</p>
                        <p>{this.state.pm10}</p>
                        <p>{this.state.so2}</p>  
                </div>
            </div>
            
        )
    }
}
export default AirCondition