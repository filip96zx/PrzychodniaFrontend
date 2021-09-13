import React from 'react';
import { NavbarComponent, StyledNavLink, RightSide } from './styles/navbar.style';
import { useAuth } from '../globalStates/GlobalStates';
import authenticationService from '../services/authentication.service';

const Navbar = (props) => {
  const [isAuth, setLogedOut] = useAuth();

  const handleLogout = () => {
    authenticationService.logout();
    setLogedOut();
    window.location.reload();
  };

  
  const LoginLogoutComponent = isAuth ? (
    <StyledNavLink className='login-link' to='/login' onClick={handleLogout}>
    Logout
    </StyledNavLink>
  ) : (
    <StyledNavLink className='login-link' to='/login'>
      Login
    </StyledNavLink>
  );

  return (
    <NavbarComponent>
      <StyledNavLink to='/'>Home</StyledNavLink>
      <StyledNavLink to='/userlist'>UserList</StyledNavLink>
      <StyledNavLink to='/doctorcreatevisits'>Utwórz wizyty</StyledNavLink>
      <RightSide>
        {LoginLogoutComponent}
      </RightSide>
    </NavbarComponent>
  );
};

export default Navbar;
