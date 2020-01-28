import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(-90deg, #cacaca, #dadada);
  margin: 60px auto 0 auto;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 18px;
    color: #595959;
    text-align: center;
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
    align-content: center;

    button {
      margin-top: 10px;
      background: transparent;
      border: 0;
    }
  }
`;

export const LoaderDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  align-items: center;
`;

export const LoaderDivDialog = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  align-items: center;
`;

export const Article = styled.article`
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  color: #000;
  padding: 15px 0 15px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;
  margin: 0 -15px 0 -15px;
  font-weight: bold;
  font-size: 14px;
`;

export const Paginate = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0 30px 0;

  button {
    padding: 10px;
    border-radius: 5px;
    border: 1px;
    border-color: #fff;
    background: #595959;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    transition: background, 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }

  p {
    color: #fff;
    font-size: 13px;
    margin: 18px 0;
  }
`;

export const Page = styled.text`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #595959;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 0 12px;
`;
