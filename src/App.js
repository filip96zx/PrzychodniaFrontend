import React, { useEffect, useState, useLayoutEffect } from 'react';
import LoginPage from './Pages/LoginPage/LoginPage';
import HomePage from './Pages/HomePage/HomePage';
import authenticationService from './services/authentication.service';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/navbar';
import { useAuth } from './globalStates/GlobalStates';
import { Container } from './Container.style';
import ForgotPassword from './Pages/ForgotPasswordPage/ForgotPassword';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import ResetPasswordPage from './Pages/ResetPasswordPage/ResetPasswordPage';
import UserListPage from './Pages/UserListPage/UserListPage';
import DoctorCreateVisitsPage from './Pages/DoctorCreateVisitsPage/DoctorCreateVisitsPage';

const App = () => {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged, setIsLoggedOut] = useAuth();

  // useLayoutEffect(() => {
  //   setUser(authenticationService.getCurrentUser());
  // }, []);

  useEffect(() => {
    if (user) {
      setIsLogged();
    } else {
      setIsLoggedOut();
    }
  }, [user]);

  return (
    <Router>
      <Navbar></Navbar>
      <Container>
        <Switch>
          <Route exact path='/'><HomePage/></Route>
          <Route path='/forgotpassword'><ForgotPassword/></Route>
          <Route path='/register'><RegisterPage/></Route>
          <Route path='/doctorcreatevisits'><DoctorCreateVisitsPage/></Route>
          <Route path='/resetpassword/:userId/:code'><ResetPasswordPage/></Route>
          <Route path='/userlist/:pageSize/:pageIndex'><UserListPage/></Route>
          <Route path='/userlist'><UserListPage/></Route>
          <Route path='/login'>{isLogged ? <Redirect push to='/' /> : <LoginPage/> }</Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
