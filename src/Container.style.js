import styled, { keyframes } from 'styled-components';
import { borderColor, mainColor } from './globalStyles/styleVariables';
const transitionIn = keyframes`
    from {
      opacity: 0;
      transform: rotateX(-10deg);
    }
    to {
      opacity: 1;
      transform: rotateX(0);
    }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(5deg, ${mainColor} 0%, rgba(255, 255, 255, 1) 100%);
  min-height: calc(100vh - 2rem);
  div.card {
    & div {
      animation: ${transitionIn} 0.20s;
    }
    & > div {
      animation: ${transitionIn} 0.75s;
    }
    width: 90vw;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 1em;
    box-shadow: 0px 0px 1px 2px ${borderColor};
    margin: 20px 0px 20px;
    min-height: 80vh;
  }

  button {
    height: 2em;
    padding: 0px 5px;
    border-radius: .6em;
    font-weight: 500;
    margin: 2px 2px;
    border: 1px solid gray;
    background: linear-gradient(5deg, rgba(214, 214, 214, 0.6) 0%, rgba(255, 255, 255, 1) 60%);
    transition: 0.5s;
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 3px 1px lightgray;
    }
  }
  select {
    border: 1px solid black;
    margin-top: 2px;
  }
`;
