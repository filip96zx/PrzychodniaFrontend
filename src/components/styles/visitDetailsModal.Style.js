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
        transition: 0.2s;
        box-shadow: 1px 1px 1px 0px gray;
      }
      li.active {
        transition: 0.2s;
        background-color: rgb(245, 245, 245);
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
      margin-left: 2rem;
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
  button {
    margin: 0px 10px;
  }

  .prescriptions-box {
    width: calc(100% - 2rem);
    display: flex;
    flex-direction: column;
    .prescription-item {
      box-shadow: 0px 0px 1px 1px gray;
      display: flex;
      flex-wrap: wrap;
      border-radius: 1em;
      margin: 5px 0;
      max-width: 31rem;
      .prescription-header {
        position: relative;
        width: 100%;
        padding: 0;
        button {
          position: absolute;
          right: 0;
        }
      }
      .medicine-list {
        padding: 0;
        margin: 0;
        ul,
        li {
          padding: 0px 15px;
          margin: 8px 0px;
        }
      }
    }
    .prescription-form-box {
      display: flex;
      max-width: 31rem;
      button {
        margin: 2px 0px 2px 5px;
      }
      .prescritpion-form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        input {
          width: 100%;
        }
        div {
          padding: 2px 0px;
        }
      }
      .new-prescription {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0px;
        min-height: 100%;
        width: 100%;
        box-shadow: 0px 0px 1px 0px gray;
        margin-left: 20px;
        .send-prescription-btn{
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
        }
        li {
          position: relative;
          width: 100%;
          padding: 5px 0 5px;
        }
        div {
          padding: 0px 0px 0px 10px;
        }
      }
    }
  }

  .findings-box{
    width: calc(100% - 2rem);
    max-width: 31rem;
    .finding-item{
      box-shadow: 0px 0px 1px 0px gray;
      border-radius: 1em;
      padding: 0;
      margin: 5px 0;
      .prescription-header{
        padding: 0;
        position: relative;
        button{
          position: absolute;
          right: 0;
        }
      }
      .finding-description{
        padding: 0px;
        margin: 0px;
        p {
          margin-left: 10px;
        }
      }
    }
    .new-finding-btn{
      width: 95%;
    }
    .new-finding-box{
      div{
        padding: 5px 0px;
        width: 100%;
      }
      .description-box{
        display: flex;
        label{
          flex-grow: 1;
        }
        label div{
          input{
            width: 100%;
          }
        } 
      }
    }
  }

  .messages-box {
    width: calc(100% - 2rem);
    .chatbox {
      box-shadow: 0px 0px 1px 1px gray;
      border-radius: 1em;
      display: flex;
      flex-direction: column-reverse;
      overflow: auto;
      max-width: 31rem;
      max-height: 18rem;
      .message-line {
        padding: 0;
        margin: 5px 0 5px;
        display: flex;
        width: 100%;
        justify-content: flex-start;
        .message {
          span {
            font-size: 0.9rem;
            padding: 5px 5px 0 5px;
          }
          background-color: rgb(245, 245, 245);
          box-shadow: 0px 0px 1px 0px gray;
          padding: 0px;
          border-radius: 1em;
          div {
            padding: 10px;
          }
        }
      }
      .my-message {
        justify-content: flex-end;
        .message {
          background-color: white;
        }
      }
    }
  }
  .send-message-box {
    form {
      width: calc(100% - 2rem);
      display: flex;
      input {
        flex-grow: 1;
      }
    }
  }
`;
