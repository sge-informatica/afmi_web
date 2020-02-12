import styled from "styled-components";
import { darken } from "polished";

export const Wrapper = styled.div`
  margin-top: 100px;
  background: linear-gradient(-90deg, #cacaca, #dadada);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  h2 {
    font-size: 18px;
    color: #595959;
  }

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

    span {
      align-items: center;
      justify-content: center;
      color: #f64c75;
      margin: 0 0 10px;
      font-weight: bold;
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
      color: #fff;

      &:hover {
        background: ${darken(0.03, "#595959")};
      }
    }
  }
`;
