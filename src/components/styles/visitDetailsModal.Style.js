import styled from 'styled-components';

export const VisitDetailModalComponent = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.42);
  word-wrap: break-word;
  @media (min-width: 630px) and (min-height: 700px) {
    height: 100vh;
    width: 100vw;
  }

  .modal {
    position: relative;
    display: flex;
    background-color: white;
    max-width: 39rem;
    border-radius: 1em;
    box-shadow: 0 0 2px 2px gray;
    @media (min-width: 630px) and (min-height: 700px) {

      min-width: 45rem;
    }
    flex-wrap: wrap;
    div.close-btn-container {
      position: absolute;
      right: 0;
      button {
        margin: 10px;
      }
    }

    .modal-header {
      width: 100%;
      //text-align: center;
      h3 {
        margin: 8px 8px 8px 30px;
      }
    }

    nav {
      ul {
        list-style-type: none;
        padding-top: 1rem;
        padding-left: 1rem;
      }
      li {
        cursor: pointer;
        padding: 5px;
        transition: 0.2s;
      }
      li:hover {
        box-shadow: 0px 2px 1px 0px gray;
      }
      li.active {
        box-shadow: 2px 2px 1px 0px gray;
      }
    }

    .content-box {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      min-height: 30rem;
      min-width: 20rem;
      align-items: flex-start;
      margin-left: 5rem;
      padding-bottom: 1rem;
      div {
        padding: 15px;
      }
    }

    div.info-box {
      @media (min-width: 630px) and (min-height: 700px) {
        position: absolute;
      } 
      right: 2rem;
      top: 2rem;
      box-shadow: 0 0 1px 0 gray;
      max-width: 13rem;
      border-radius: 1em;
      label {
        display: block;
        padding: 0.5em 0px;
      }
    }
  }
  
  button{
    margin: 0px 10px;
  }
`;
