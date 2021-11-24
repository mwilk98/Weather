import React, {useState, useEffect} from 'react';
import './UserPanel.css';
import Axios from 'axios';
import UserWeatherItem from './UserWeatherItem';
import {Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';

function UserPanel()
{

    const [Lid, setLid] = useState('');

    const { register, handleSubmit, formState: { errors }} = useForm();
  const onSubmit = (values) => {
    Axios.post('http://localhost:3001/api/insert',
        {
            cityName:values.cityName,
            date:values.date,
            time:values.time,
            weatherState:values.weatherState,
            temp:values.temp,
            clouds:values.clouds,
            humidity:values.humidity,
            pressure:values.pressure,
            wind:values.wind,
            aqi:values.aqi
        });
        setcityWeatherList([...cityWeatherList,{
            cityName:values.cityName,
            date:values.date,
            time:values.time,
            weatherState:values.weatherState,
            temp:values.temp,
            clouds:values.clouds,
            humidity:values.humidity,
            pressure:values.pressure,
            wind:values.wind,
            aqi:values.aqi
        },]);
        window.location.reload(false);
  };


    const [cityWeatherList, setcityWeatherList] = useState([]);
    const [property, setProperty] = useState([]);

    Axios.defaults.withCredentials = true;

    const [loginStatus, setLoginStatus] = useState('');
    console.log(loginStatus);

   
    useEffect(()=>
    {
        Axios.get('http://localhost:3001/api/login').then((response)=>
        {
            if(response.data.loggedIn===true)
            {
                setLoginStatus(response.data.user[0].username);
                console.log(response);
            }else
            {
                console.log(response);
                setLoginStatus("unlogged");
            }
        });

        Axios.get('http://localhost:3001/api/get')
        .then((response)=>
        {
            setcityWeatherList(response.data);
            setProperty(response.data[0]);
            console.log(response);
            console.log("PropertyGet:",property);
        });
        
        setLid(0);
        setProperty(cityWeatherList[Lid]);
    },[])

    const deleteWeather = (id) =>
    {
        console.log(id);
        Axios.post('http://localhost:3001/api/delete',
        {
            id:id
        });
        
        window.location.reload(false);
        
        console.log("USUNIETO");
    }
    const logout = () =>
    {
        Axios.post('http://localhost:3001/api/logout')
            .then((response) =>
            {
            console.log(response);
            if(response.data.message)
            {
                setLoginStatus("logged");
            }else
            {
                setLoginStatus("unlogged");
            }
        })
        Axios.get('http://localhost:3001/api/logout').then((response)=>
        {
            if(response.data.loggedIn===false)
            {
                console.log(response);
                setLoginStatus("unlogged");
            }else
            {
                setLoginStatus("logged");
                console.log(response);
            }
        })
        window.location.reload(false);
    }
    const nextProperty = () => 
    {
        const newIndex = Lid+1;
        setLid(Lid+1);
        setProperty(cityWeatherList[newIndex]);

        console.log("New index:",newIndex);
        console.log("Property:",property);
    }
    
    const prevProperty = () => 
    {
        const newIndex = Lid-1;
        setLid(Lid-1);
        setProperty(cityWeatherList[newIndex]);
        console.log("New index:",newIndex);
        console.log("Property:",property);
    }
    if(loginStatus!=="unlogged")
    {
        return(
            <div className="hero2"  style={
                                    { 
                                        backgroundImage: `url("/images/bg_signUp.jpg")` 
                                    }
            }>
                <div className="form-box2">
                    <div className="login-input-group2">
                    <form onSubmit={handleSubmit(onSubmit)}>


                        Miejsce
                        <input type="text" name = "message"  className="input-field2" placeholder="Miejsce" required 
                        {...register("cityName", {
                            required: "Required",
                        })}
                        />
                        Data
                        <input type="date" className="input-field2" placeholder="Data" required 
                        {...register("date", {
                            required: "Required",
                        })}/>
                        Godzina
                        <input type="time" className="input-field2" placeholder="Godzina" required 
                        {...register("time", {
                            required: "Required",
                        })}/>
                        Pogoda
                        <td></td>
                        <select {...register("weatherState", {
                            required: "Required",
                        })}>
                                <option value="Czyste Niebo">Czyste Niebo</option>
                                <option value="Lekkie Zachmurzenie">Lekkie Zachmurzenie</option>
                                <option value="Zachmurzenie">Zachmurzenie</option>
                                <option value="Duże Zachmurzenie">Duże Zachmurzenie</option>
                                <option value="Przejaśnienia">Przejaśnienia</option>
                                <option value="Lekki deszcz">Lekki deszcz</option>
                                <option value="Deszcz">Deszcz</option>
                                <option value="Burza">Burza</option>
                                <option value="Śnieg">Śnieg</option>
                                <option value="Mgła">Mgła</option>
                        </select>
                        <td></td>
                        Temperatura
                        <input type="number" min="-100" max="100" className="input-field2" placeholder="Temperatura (°C)" required 
                        {...register("temp", {
                            required: "Required",
                        })}/>
                        Zachmurzenie
                        <input type="number" min="0" max="100" className="input-field2" placeholder="Zachmurzenie (%)" required 
                        {...register("clouds", {
                            required: "Required",
                        })}/>
                        Wilgotność
                        <input type="number" min="0" max="100" className="input-field2" placeholder="Wilgotność" required 
                        {...register("humidity", {
                            required: "Required",
                        })}/>
                        Ciśnienie
                        <input type="number" min="850" max="1100" className="input-field2" placeholder="Ciśnienie (hPa)" required 
                        {...register("pressure", {
                            required: "Required",
                        })}/>
                        Wiatr
                        <input type="number" min="0" max="500" className="input-field2" placeholder="Wiatr (km/h)" required 
                        {...register("wind", {
                            required: "Required",
                        })}/>
                        Jakość powietrza
                        <input type="number" min="1" max="5" className="input-field2" placeholder="Jakość powietrza (1-5)" 
                        {...register("aqi", {
                            required: "Required",
                        })}/>
                        <input type="submit" className="submit-btn2" /> 
                        {errors.message && errors.message.message}
                        <button type="submit" className="submit-btn2" onClick={logout}> Wyloguj </button>
                        </form>
                    </div>
                </div>   
                <div className="user-main">
                
                    <div className="user-cards">
                        <button className="left" 
                            onClick={() => nextProperty()} 
                            disabled={Lid === cityWeatherList.length-1}
                        >Next
                        </button>
                        <button className="right"
                            onClick={() => prevProperty()} 
                            disabled={Lid === 0}
                        >Prev
                        </button>
                        <div className="main-cards">
                            <div className="userCards-slider">
                            {property ?(
                                <div className="userCards-slider-wrapper"   style={
                                                                            {
                                                                                'transform':`translateX(-${Lid*(100/cityWeatherList.length)}%)`
                                                                            }
                                }>
                                    {cityWeatherList.map(fde => <UserWeatherItem element={fde} deleteW={deleteWeather}/>)}
                                </div>
                                ):null}
                            </div>
                        </div>
                    </div>
                
                </div> 
            </div>
        )
    }else{
        return(
            <div className="hero"   style={
                                    { 
                                        backgroundImage: `url("/images/bg_signUp.jpg")` 
                                    }
            }>
                <div className="form-box">
                    <div className="login-input-group" >
                        <h1>Musisz być zalogowanym aby korzystać z tej funkcji.</h1>
                        <Link to='/sign-up'><button type="submit" className="submit-btn"> Zaloguj </button></Link>
                    </div>
                </div>   
            </div>
        )
    }
}
export default UserPanel;