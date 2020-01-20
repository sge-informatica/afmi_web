import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  > form {
    display: flex;
    align-self: center;
    align-items: center;

    header {
      display: flex;
      align-self: center;
      align-items: center;

      input {
        text-align: center;
        width: 200px;
        background: none;
        border: 0;
        padding: 8px;
        border-bottom: 1px solid #555;
        transition: 0.6s;
        &:focus {
          width: 280px;
        }
      }

      button {
        background: transparent;
        border: none;
        margin: 10px auto auto 12px;
      }
    }
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;

    li {
      padding: 30px 120px;
      border-radius: 5px;
      background: #595959;

      strong {
        display: block;
        color: #fff;
        font-size: 21px;
      }

      span {
        display: block;
        color: #eee;
        margin-top: 13px;
        font-style: italic;
      }

      h2 {
        font-size: 17px;
        display: block;
        color: #eee;
        margin-top: 13px;
      }

      div {
        max-width: 1000px;
        margin: 50px 0 0 0;
        display: flex;
        flex-direction: column;

        input {
          display: flex;
          text-align: center;
          width: 300px;
          background: transparent;
          border: 0;
          color: #fff;
          padding: 8px;
          border-bottom: 1px solid #fff;

          &::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        }

        > header {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;

          button {
            border: 0;
            background: transparent;
            margin: 20px 0 0 0;
          }
        }
      }
    }
  }
`;

export const LoaderDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  align-items: center;
`;
