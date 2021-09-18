import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarComponent = styled.div`
  position: relative;
  display: flex;
  height: 3rem;
  box-shadow: 0 4px 2px -2px orange;
  
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  text-transform:uppercase;
  height: 100%;
  color: black;
  align-items: center;
  padding: 0 5px;
  transition: .2s;
  &.active{
    color: white;
    background-color: orange;
  }
  :hover{
    background-color: #ccc;
  }

`;

export const RightSide = styled.div`
  position: absolute;
  display: flex;
  right: 1rem;
  height: 100%;
`;
