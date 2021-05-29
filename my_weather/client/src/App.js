import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import Navbar from './Menu/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserPanel from './components/UserPanel/UserPanel';
import AirCondition from './components/AirCondition/AirCondition';
import WeatherAlerts from './components/WeatherAlerts/WeatherAlerts';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={CurrentWeather}/>
        <Route path='/my-weather' exact component={UserPanel}/>
        <Route path='/air-condition' exact component={AirCondition}/>
        <Route path='/weather-alerts' exact component={WeatherAlerts}/>
      </Switch>
    </Router>




  );
}

export default App;
