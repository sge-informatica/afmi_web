import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 650px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.3);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        color: rgba(255, 255, 255, 1);
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: #aaa;
      margin: 10px 0 20px;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #595959;
      font-weight: bold;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: 0.2s;
      color: #eee;

      &:hover {
        background: ${darken(0.03, "#595959")};
      }
    }
  }

  > button {
    width: 100%;
    margin: 40px 0 0;
    height: 44px;
    background: #744040;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.2s;
    color: #eee;

    &:hover {
      background: ${darken(0.1, "#744040")};
    }
  }
`;
