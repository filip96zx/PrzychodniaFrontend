import React, { useState } from 'react';
import { NavbarComponent, StyledNavLink, RightSide } from './styles/navbar.style';
import { useAuth } from '../globalStates/GlobalStates';
import authenticationService from '../services/authentication.service';

const Navbar = ({ hasRole }) => {
  const [isAuth, setLogedOut] = useAuth();
  const [showItems, setShowItems] = useState(false);

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
      <div className='show-menu-btn'>
        <svg onClick={() => setShowItems(!showItems)} className='icon' viewBox='0 0 100 80' width='30' height='30'>
          <rect width='100' rx='9' height='20'></rect>
          <rect y='30' rx='9' width='100' height='20'></rect>
          <rect y='60' rx='9' width='100' height='20'></rect>
        </svg>
      </div>
      <div className={showItems ? 'show' : null}>
        <StyledNavLink to='/' exact>
          Strona główna
        </StyledNavLink>
        {hasRole('admin') && <StyledNavLink to='/userlist'>Panel admina</StyledNavLink>}
        {hasRole('doctor') && <StyledNavLink to='/doctorcreatevisits'>Panel lekarza</StyledNavLink>}
        {hasRole('user') && <StyledNavLink to='/patientregister'>Rejestracja wizyt</StyledNavLink>}
        {hasRole('user') && <StyledNavLink to='/registeredvisits'>Zaplanowane wizyty</StyledNavLink>}
        {hasRole('user') && <StyledNavLink to='/donevisits'>Historia wizyt</StyledNavLink>}
        {LoginLogoutComponent}
        {/* <RightSide>{LoginLogoutComponent}</RightSide> */}
      </div>
    </NavbarComponent>
  );
};

export default Navbar;
