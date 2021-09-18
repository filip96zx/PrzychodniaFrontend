import React from 'react';
import { NavbarComponent, StyledNavLink, RightSide } from './styles/navbar.style';
import { useAuth } from '../globalStates/GlobalStates';
import authenticationService from '../services/authentication.service';

const Navbar = ({ hasRole }) => {
  const [isAuth, setLogedOut] = useAuth();

  const handleLogout = () => {
    authenticationService.logout();
    setLogedOut();
    window.location.reload();
  };

  const LoginLogoutComponent = isAuth ? (
    <StyledNavLink className='login-link' to='/login' onClick={handleLogout}>
      wyloguj
    </StyledNavLink>
  ) : (
    <StyledNavLink className='login-link' to='/login'>
      Zaloguj
    </StyledNavLink>
  );

  return (
    <NavbarComponent>
      <StyledNavLink to='/' exact>
        Strona główna
      </StyledNavLink>
      {hasRole('admin') && <StyledNavLink to='/userlist'>Panel admina</StyledNavLink>}
      {hasRole('doctor') && <StyledNavLink to='/doctorcreatevisits'>Panel lekarza</StyledNavLink>}
      {hasRole('user') && <StyledNavLink to='/patientregister'>Rejestracja wizyt</StyledNavLink>}
      {hasRole('user') && <StyledNavLink to='/registeredvisits'>Zaplanowane wizyty</StyledNavLink>}
      {hasRole('user') && <StyledNavLink to='/donevisits'>Historia wizyt</StyledNavLink>}
      <RightSide>{LoginLogoutComponent}</RightSide>
    </NavbarComponent>
  );
};

export default Navbar;
