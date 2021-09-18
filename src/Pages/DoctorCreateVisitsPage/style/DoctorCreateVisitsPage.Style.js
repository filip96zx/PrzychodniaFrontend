import styled from 'styled-components';

export const DoctorCreateVisitsComponent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
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
    border-bottom: 2px black solid;
    text-align: center;
  }

  div.waiting-visit {
    background-color: rgba(170, 255, 181, 0.5);
  }

  .day-column{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
  }

  .visit-item {
    box-shadow: 0px 0px 1px gray;
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
