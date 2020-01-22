import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 60px auto;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 18px;
    color: #595959;
    align-self: center;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    align-self: center;
    align-items: center;

    header {
      display: flex;
      align-self: center;
      align-items: center;

      input {
        text-align: center;
        width: 250px;
        background: none;
        border: 0;
        padding: 8px;
        border-bottom: 1px solid #555;
        transition: 0.6s;
        &:focus {
          width: 300px;
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
      padding: 30px 100px;
      border-radius: 5px;
      background: #595959;

      strong {
        display: block;
        text-align: center;
        color: #fff;
        font-size: 21px;
      }

      span {
        display: block;
        text-align: center;
        color: #eee;
        margin-top: 18px;
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

        > strong {
          display: block;
          color: #fff;
          font-size: 17px;
        }

        > header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          button {
            display: flex;
            flex-direction: column;
            border: 0;
            background: transparent;
            margin: 28px 0 0 0;
            align-items: center;
            color: #fff;
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
