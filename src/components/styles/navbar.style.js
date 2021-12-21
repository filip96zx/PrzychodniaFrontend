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

const moveUp = keyframes`
  from {
    max-height: 50vh;
  }
  to {
    max-height: 0; 
  }
`;

const moveRotate = (move, rotate) => 
  keyframes`
    0% {

    }
    50%{
      transform-origin: center;
      transform: translateY(${move});
    }
    100%{
      transform-origin: center;
      transform: rotate(${rotate}) translateY(${move}) ;
    }
  `;

const moveRotateBack = (move, rotate) => 
  keyframes`
  0% {
    transform-origin: center;
    transform: rotate(${rotate}) translateY(${move})
  }
  50%{
    transform-origin: center;
    transform: translateY(${move});
  }
  100%{
  }
`;


export const NavbarComponent = styled.div`
  top: 0;
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
      margin-right: 10px;
      overflow: visible;
      padding: 0 7px;
      transition: .2s;
      &:hover{
        cursor: pointer;
        transform: scale(1.1);
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
    }
    .hide {
      animation: ${moveUp} .4s forwards;
    }
    .show{
      animation: ${fallDown} 1.5s forwards;
    }

    .cross #rect-one {
      animation: ${moveRotate('30px', '45deg')} .3s linear forwards;
    }
    .cross #rect-two {
      animation: ${moveRotate('0px', '-45deg')} .3s linear forwards;
    }
    .cross #rect-three {
      animation: ${moveRotate('-30px', '45deg')} .3s linear forwards;
    }
    .menu #rect-one {
      animation: ${moveRotateBack('30px', '45deg')} .3s linear forwards;
    }
    .menu #rect-two {
      animation: ${moveRotateBack('0px', '-45deg')} .3s linear forwards;
    }
    .menu #rect-three {

      animation: ${moveRotateBack('-30px', '45deg')} .3s linear forwards;
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

