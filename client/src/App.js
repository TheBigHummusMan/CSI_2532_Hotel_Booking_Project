import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';

// importing components
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

const App = () => {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Routes>
            <Route exact path ='/login' render = {props => <Login {...props}/>}/>
            <Route exact path ='/register' render = {props => <Register {...props}/>}/> 
            <Route exact path ='/dashboard' render = {props => <Dashboard {...props}/>}/>
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
};



export default App;