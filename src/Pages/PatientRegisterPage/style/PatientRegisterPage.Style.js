import styled from 'styled-components';
import { borderColor } from '../../../globalStyles/styleVariables';

export const PatientRegisterPageComponent = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .select-visit-box {
    margin-top: 2em;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    div {
      margin: 0 1em 1em;
    }
    select {
      min-width: 10em;
    }
  }
  div.week-visit-box {
    display: flex;
    width: 100%;
    padding: 10px 0px;
    flex-wrap: wrap;
    .day-column {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      @media (max-width: 600px){
        width: 100%;
        padding-bottom: 50px;
        border-bottom: 2px solid ${borderColor};
      }
      @media (max-width: 1024px){
        min-width: 50%;
        padding-bottom: 50px;
        border-bottom: 2px solid ${borderColor};
      }
      align-items: center;
    }
    .visit-item {
      box-shadow: 0px 0px 1px gray;
      margin: 10px 5px;
      padding: 5px;
      border-radius: 1em;
      width: auto;
    }
    .day-header {
      font-size: 1.8rem;
      text-align: center;
      border-bottom: 1px solid ${borderColor};
    }


  }
`;
