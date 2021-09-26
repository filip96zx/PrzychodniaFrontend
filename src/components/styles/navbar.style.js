import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { mainColor } from '../../globalStyles/styleVariables';

export const NavbarComponent = styled.div`
  position: relative;
  display: flex;
  height: 2rem;
  box-shadow: 0 4px 2px -3px ${mainColor};
  background-image: linear-gradient(190deg, ${mainColor} 0%, rgba(255,255,255,1) 100%);
  
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  text-transform:uppercase;
  height: 100%;
  color: black;
  align-items: center;
  font-size: 1.2rem;
  padding: 0 5px;
  transition: .2s;
  font-weight: 600;
  margin-right: 15px ;
  &.active{
    color: white;
    background-color: ${mainColor};
  }
  :hover{
    background-color: rgba(0, 104, 255, 0.79);
  }

`;

export const RightSide = styled.div`
  position: absolute;
  display: flex;
  right: 1rem;
  height: 100%;
`;
