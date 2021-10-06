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
  width: 1.8em;
  height: 1.8em;
  border-radius: 50%;
  border: 4px solid #ddd;
  border-top: 4px solid gray;
  border-bottom: 4px solid gray;
  animation: ${rotate} 1.6s infinite linear;
`;
