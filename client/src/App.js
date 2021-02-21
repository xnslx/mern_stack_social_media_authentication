import './App.css';
import Login from './component/login/Login';
import Home from './component/home/Home';
import {Switch,BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;
