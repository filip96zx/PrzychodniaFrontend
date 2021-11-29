import { NavLink } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { mainColor } from '../../globalStyles/styleVariables';

const fallDown = keyframes`
  from {
    max-height: 0; 
  }
  to {
    max-height: 100vh;
  }
`;

const fallUp = keyframes`
  from {
    max-height: 100vh;
  }
  to {
    max-height: 0; 
  }
`;

export const NavbarComponent = styled.div`
  position: relative;
  box-shadow: 0 1px 2px 1px ${mainColor};
  min-height: 2rem;
  background-image: linear-gradient(190deg, ${mainColor} 0%, rgba(255, 255, 255, 1) 100%);
  .show-menu-container {
    display: none;
  }
  .column-menu {
    display: none;
  }
  .row-menu {
    position: relative;
    display: flex;
    .login-link {
      position: absolute;
      right: 0;
    }
  }
  @media (max-width:1024px){
    .show-menu-container {
      display: flex;
      justify-content: flex-end;
  
    }
    .icon {
      margin-right: 5px;
      padding: 0 5px;
      &:hover{
        cursor: pointer;
      }
    }
    .row-menu {
    display: none;
    }
    .column-menu {
      display: flex;
      flex-direction: column;
      max-height: 0;
      overflow: hidden;
      animation: ${fallDown} 1s forwards;
    }
    /* .show{
      display: none;
    } */
    .hide {
      animation: ${fallUp} .2s forwards;
    }

  }

`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  text-transform: uppercase;
  justify-content: center;
  height: 2rem;
  color: black;
  align-items: center;
  font-size: 1.7rem;
  transition: 0.2s;
  font-weight: 600;
  @media (min-width: 1025px) {
    margin: 0px 15px 0 0;
    padding: 0 5px;
    font-size: 1.2rem;
  }
  &.active {
    color: white;
    background-color: ${mainColor};
  }
  :hover {
    background-color: rgba(0, 104, 255, 0.79);
  }
`;

