import styled from 'styled-components';
import { mainColor } from '../../../globalStyles/styleVariables';

export const PatientRegisteredVisitComponent = styled.div`
  margin: 1rem auto;
  width: fit-content;
  table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1em;
    font-family: sans-serif;
    thead tr {
      background-color: ${mainColor};
      color: black;
      text-align: left;
    }
    th,
    td {
      padding: 8px 12px;
    }

    tbody tr {
      border-bottom: 1px solid #ddd;
    }
  }
`;
