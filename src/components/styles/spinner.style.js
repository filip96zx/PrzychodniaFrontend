import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  font-size: 2px;
  text-indent: -9999em;
  width: 16em;
  height: 16em;
  border-radius: 50%;
  background: ${props => props.color ? props.color : 'white'};
  background: linear-gradient(to right, ${props => props.color ? props.color : 'white'} 10%, rgba(255, 255, 255, 0) 42%);
  position: relative;
  animation: ${rotate} 1.4s infinite linear;
  transform: translateZ(0);
  :before {
    width: 50%;
    height: 50%;
    background: ${props => props.color ? props.color : 'white'};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }
  :after {
    background: ${props => props.backgroundColor ? props.backgroundColor : 'gray'};
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

