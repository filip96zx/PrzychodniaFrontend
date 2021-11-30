import styled from 'styled-components';
import { borderColor } from '../../../globalStyles/styleVariables';

export const DoctorCreateVisitsComponent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding-bottom: 2em;
  div {
    width: 150px;
  }
  div.date-pick-box {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0px 20px;
  }
  div.warning-box {
    width: 100%;
    text-align: center;
  }
  div.save-visit-box {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items:center;
    flex-direction: column;
  }

  
  div.add-visit-box {
    padding: 5px;
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      select{
        flex-grow: 1;
      }
    }
  }

  .day-header {
    font-size: 1.4rem;
    padding: 0px 5px;
    text-align: center;
  }

  div.waiting-visit {
    background-color: white;
  }

  div.reserved-visit {
    box-shadow: 0px 0px 2px 0px black;
    border: 1px solid gray;
  }

  .day-column{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    @media (max-width: 600px){
        width: 100%;
        padding-bottom: 50px;
        border-bottom: 2px solid ${borderColor};
      }
      @media (max-width: 1024px){
        min-width: 40%;
        padding-bottom: 50px;
        border-bottom: 2px solid ${borderColor};
      }
  }

  .visit-item {
    box-shadow: 0px 0px 2px gray;
    margin: 4px;
    padding: 5px;
    border-radius: 1em;
    width: auto;
    .cancel-delete-box {
      width: 100%;
      display: flex;   
      justify-content: end;
    }
  }

`;
