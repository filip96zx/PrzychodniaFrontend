import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavbarComponent = styled.div`
  position: relative;
  display: flex;
  height: 3vh;
  background-color: #ddd;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  text-transform:uppercase;
  height: 100%;
  color: black;
  align-items: center;
  margin: 0 10px;
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
