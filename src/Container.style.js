import styled from 'styled-components';
import { borderColor, mainColor } from './globalStyles/styleVariables';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(5deg, ${mainColor} 0%, rgba(255,255,255,1) 100%);
  min-height: calc(100vh - 2rem);
  div.card {
    width: 90vw;
    background-color: rgba(255,255,255,.70);
    border-radius: 1em;
    box-shadow: 0px 0px 1px 2px ${borderColor};
    margin: 20px 0px 20px;
    min-height: 80vh;
  }

  button {
    border: none;
    height: 2em;
    padding: 0px 5px;
    border-radius: 0.6em;
    font-weight: 500;
    margin: 2px 2px;
    background-color: white;
    box-shadow: 0px 0px 1px 0px gray;
    transition: background-image 1.5s;
    :hover{
      cursor: pointer;
      background-image: linear-gradient(5deg, rgba(214, 214, 214, 0.6) 0%, rgba(255,255,255,1) 60%);
    }
  }
  select{
    border: 1px solid black;
    margin-top: 2px;
  }

`;
