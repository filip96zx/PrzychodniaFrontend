import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { mainColor } from '../../globalStyles/styleVariables';

export const NavbarComponent = styled.div`
position: relative;
.icon {
  align-self: flex-end;
  padding: 2px 1em 0 0;
  cursor: pointer;
}
min-height: 2rem;
div {
  position: relative;
  display: flex;
  height: 2rem;
  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto;
    overflow: hidden;
    display: none;
  }
}
@media (max-width: 1024px) {
  .show-menu-btn{
    display: flex;
  }
}
@media (min-width: 1025px) {
  .show-menu-btn {
    display: none;
  }
  .login-link{
    position: absolute;
    right:0;
  }
}
  box-shadow: 0 4px 2px -3px ${mainColor};
  background-image: linear-gradient(190deg, ${mainColor} 0%, rgba(255, 255, 255, 1) 100%);
  .show{
    display: flex;
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  text-decoration: none;
  text-transform: uppercase;
  justify-content: center;
  height: 100%;
  color: black;
  align-items: center;
  margin: 2px 0;
  font-size: 1.5rem;
  transition: 0.2s;
  font-weight: 600;
  @media (min-width: 1025px){
    margin-right: 15px;
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

export const RightSide = styled.div`
  position: absolute;
  height: 100%;
`;
