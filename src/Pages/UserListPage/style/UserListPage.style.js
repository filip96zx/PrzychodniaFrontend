import styled from 'styled-components';
import {mainColor} from '../../../globalStyles/styleVariables'

export const UserListComponent = styled.div`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  width: 90%;
  .search-element {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .table-box{
    table{
      margin: 0 auto;
    }
    overflow-x: auto;
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
    justify-content: center;
  }
  .role-manage-box {
    div p {
      word-break: break-word;
    }
    select{
      min-width: 8em;
    }
  }
`;
