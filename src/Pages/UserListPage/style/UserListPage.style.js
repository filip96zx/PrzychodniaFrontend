import styled from 'styled-components';
import {mainColor} from '../../../globalStyles/styleVariables'

export const UserListComponent = styled.div`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  width: fit-content;
  .search-element {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
  }

  table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 1em;
    font-family: sans-serif;
    min-width: 400px;
    thead tr {
      background-color: ${mainColor};
      color: black;
      text-align: left;
    }
    th,
    td {
      padding: 8px 12px;
    }
    y tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }
    tbody tr {
      border-bottom: 1px solid #ddd;
    }
  }

  .pagination-element {
    display: flex;
    justify-content: end;
  }
  .role-manage-box {
    select{
      min-width: 8em;
    }
  }
`;
