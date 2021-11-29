import React, { useState } from 'react';
import { NavbarComponent, StyledNavLink} from './styles/navbar.style';
import { useAuth } from '../globalStates/GlobalStates';
import authenticationService from '../services/authentication.service';

const Navbar = ({ hasRole }) => {
  const [isAuth, setLogedOut] = useAuth();
  const [showItems, setShowItems] = useState(false);
  const [hide, setHide] = useState(false);
  const [hideDelay, setHideDelay] = useState(false);

  const handleLogout = () => {
    authenticationService.logout();
    hideItems();
    setLogedOut();
    window.location.reload();
  };
  
  const hideItems = () => {
    if(!hideDelay){
      setHide(true);
      setHideDelay(true);
      setTimeout(() => {
        setShowItems(false);
        setHide(false);
        setHideDelay(false);
      }, 200);
    }
  };

  const handleMenuButton = () => {
    if(!showItems){
      setShowItems(true);
    } else {
      hideItems();
    }
  }

  const LoginLogoutComponent = isAuth ? (
    <StyledNavLink className='login-link' to='/login' onClick={handleLogout}>
      Wyloguj
    </StyledNavLink>
  ) : (
    <StyledNavLink onClick={hideItems} className='login-link' to='/login'>
      Zaloguj
    </StyledNavLink>
  );

  const menu = <>
  <StyledNavLink onClick={hideItems} to='/' exact>
    Strona główna
  </StyledNavLink>
  {hasRole('admin') && (
    <StyledNavLink onClick={hideItems} to='/userlist'>
      Panel admina
    </StyledNavLink>
  )}
  {hasRole('doctor') && (
    <StyledNavLink onClick={hideItems} to='/doctorcreatevisits'>
      Panel lekarza
    </StyledNavLink>
  )}
  {hasRole('user') && (
    <StyledNavLink onClick={hideItems} to='/patientregister'>
      Rejestracja wizyt
    </StyledNavLink>
  )}
  {hasRole('user') && (
    <StyledNavLink onClick={hideItems} to='/registeredvisits'>
      Zaplanowane wizyty
    </StyledNavLink>
  )}
  {hasRole('user') && (
    <StyledNavLink onClick={hideItems} to='/donevisits'>
      Historia wizyt
    </StyledNavLink>
  )}
  {LoginLogoutComponent}
</>;

  return (
    <NavbarComponent>
      <div className='show-menu-container'>
        <svg onClick={() => handleMenuButton()} className='icon' viewBox='0 0 100 80' width='30' height='30'>
          <rect width='100' rx='9' height='20'></rect>
          <rect y='30' rx='9' width='100' height='20'></rect>
          <rect y='60' rx='9' width='100' height='20'></rect>
        </svg>
      </div>
      <div className='row-menu'>{menu}</div>
      {showItems && <div className={hide ? 'column-menu hide' : 'column-menu'}>{menu}</div>}

      {/* <div className={showItems ? 'column-menu show' : 'column-menu show hide'}>{menu}</div> */}
      
    </NavbarComponent>
  );
};

export default Navbar;
