import styled from 'styled-components';

export const UserListComponent = styled.div`
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
      background-color: gray;
      color: black;
      text-align: left;
    }
    th, td {
      padding: 8px 12px;
    }y
    tbody tr:nth-of-type(even) {
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
`;
