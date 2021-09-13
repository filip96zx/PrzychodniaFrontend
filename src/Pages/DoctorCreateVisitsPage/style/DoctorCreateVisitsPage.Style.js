import styled from 'styled-components';

export const DoctorCreateVisitsComponent = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-wrap: wrap;
  div {
  width: 150px;
  }
  div.date-pick-box{
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0px 20px;
  }
  div.warning-box{
    width: 100%;
    text-align: center;
  }
  div.add-visits-box{
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;
