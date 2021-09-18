import styled from 'styled-components';

export const UserEditModalComponent = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  flex-grow: 1;
  background-color: rgba(0, 0, 0, 0.42);
  @media(min-width:630px) and (min-height:700px){

    height: 100vh;
    width: 100vw;
  }

  .modal {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    max-width: 39rem;
    border-radius: 1em;
    box-shadow: 0 0 2px 2px gray;
    .close-btn-container {
      position: absolute;
      right:0;
      top:0;
      button {
        margin: 10px;
      }
    }
    .modal-header{
      width: 100%;
      
    }
  }
`;

export const UserEditFormComponent = styled.div`
  display: flex;
  flex-grow: 0;
  flex-wrap: wrap;
  justify-content: center;

  div.role-form {
    form {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 2rem;
      justify-content: space-around;
      .role-list {
        width: 100%;
        p {
          width: 100%;
          margin: 10px 22px;
          text-align: left;
          font-size: 1.2rem;
        }
      }
      div {
        display: flex;
        padding: 0px 5px;
        margin: 0px;
        align-items: flex-end;
      }
      select {
        width: 14rem;
      }
      button {
        height: 2.5rem;
      }
    }
  }

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h3 {
      width: 100%;
    }
    div.form-group {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin: 0 30px;
    }
    span {
      position: absolute;
      color: red;
      font-size: 0.8rem;
      font-weight: bold;
    }
    div {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
      label {
        font-weight: bold;
      }
      input,
      select {
        display: block;
        width: 15rem;
        height: 2rem;
        font-size: 1.2rem;
      }
      select {
        border: 1px solid gray;
        width: 15.5rem;
        height: 2.5rem;
      }
    }

    .data-container {
      background-color: white;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 15.3rem;
      height: 2.3rem;
      padding: 0px;
      margin: 0px;
      border: 1px solid gray;
      span {
        padding-left: 3px;
        font-size: 1.2rem;
        color: black;
      }
    }

    .btn-container {
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 1.5em;
      button {
        border: 1px solid black;
        height: 1.5rem;
        text-transform: uppercase;
        font-size: 1rem;
        margin: 0 25px;
        :hover {
          background-color: #ffff;
        }
      }
    }
    .error-box {
      padding-top: 20px;
      width: 100%;
      height: 2rem;
      text-align: center;
    }
    h3 {
      text-align: center;
    }
  }
`;
