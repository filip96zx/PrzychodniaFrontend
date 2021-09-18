import styled from 'styled-components';

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
    margin: 0 10px;
    .day-column {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
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
      border-bottom: 2px black solid;
      text-align: center;
    }


  }
`;
