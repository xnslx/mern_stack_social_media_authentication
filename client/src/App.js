import './App.css';
import Login from './component/login/Login';
import Home from './component/home/Home';
import Profile from './component/profile/Profile';
import {Switch,BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './reducer/index';
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
