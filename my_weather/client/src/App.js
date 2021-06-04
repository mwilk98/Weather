import './App.css';
import CurrentWeather from './components/currentWeather/CurrentWeather';
import Navbar from './Menu/Navbar'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import UserPanel from './components/UserPanel/UserPanel';
import AirCondition from './components/AirCondition/AirCondition';
import Compare from './components/Compare/Compare'
import SignUp from './components/SignUp/SignUp'

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={CurrentWeather}/>
        <Route path='/my-weather' exact component={UserPanel}/>
        <Route path='/air-condition' exact component={AirCondition}/>
        <Route path='/compare' exact component={Compare}/>
        <Route path='/sign-up' exact component={SignUp}/>
      </Switch>
    </Router>




  );
}

export default App;
