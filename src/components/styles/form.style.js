import styled from 'styled-components';

export const FormComponent = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 20px;
  width: fit-content;
  padding-top: 2.5rem;
  margin: 1rem auto;
  box-shadow: 0 0 2px 1px lightblue;
  border-radius: 1em;
  height: auto;
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

  .btn-container {
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
`;

