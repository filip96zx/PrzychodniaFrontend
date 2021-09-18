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
import PatientRegisterPage from './Pages/PatientRegisterPage/PatientRegisterPage';
import PatientRegisteredVisitsPage from './Pages/PatientRegisteredVisitsPage/PatientRegisteredVisitsPage';
import PatientDoneVisitsPage from './Pages/PatientDoneVisitsPage/PatientDoneVisitsPage';

const App = () => {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged, setIsLoggedOut] = useAuth();

  useEffect(() => {
    const user = authenticationService.getCurrentUser();
    if (user === null || user === undefined) {
      setIsLoggedOut();
    } else {
      setUser(user);
      setIsLogged();
    }
    setUser(user);
  }, [isLogged]);

  const hasRole = (data) => {
    return user?.role.includes(data) ? true : false;
  };
  return (
    <Router>
      <Navbar hasRole={hasRole}></Navbar>
      <Container>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route path='/register'>{isLogged ? <Redirect push to='/' /> : <RegisterPage />}</Route>
          <Route path='/doctorcreatevisits'>{hasRole('doctor') ? <DoctorCreateVisitsPage /> : <Redirect push to='/' />}</Route>
          <Route path='/patientregister'>{hasRole('user') ? <PatientRegisterPage /> : <Redirect push to='/' />}</Route>
          <Route path='/registeredvisits'>{hasRole('user') ? <PatientRegisteredVisitsPage /> : <Redirect push to='/' />}</Route>
          <Route path='/donevisits'>{hasRole('user') ? <PatientDoneVisitsPage /> : <Redirect push to='/' />}</Route>
          <Route path='/userlist/:pageSize/:pageIndex'>{hasRole('admin') ? <UserListPage /> : <Redirect push to='/' />}</Route>
          <Route path='/userlist'>{hasRole('admin') ? <UserListPage /> : <Redirect push to='/' />}</Route>
          <Route path='/resetpassword/:userId/:code'>
            <ResetPasswordPage />
          </Route>
          <Route path='/forgotpassword'>
            <ForgotPassword />
          </Route>
          <Route path='/login'>{isLogged ? <Redirect push to='/' /> : <LoginPage />}</Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
