import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  max-width: 1350px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: center;

    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;
      margin-top: 15px;

      button {
        height: 80px;
        width: 250px;
        background: #595959;
        font-weight: bold;
        border-width: 1px;
        border-radius: 30px;
        transition: 0.2s;
        color: #fff;

        &:hover {
          background: ${darken(0.03, "#595959")};
        }

        strong {
          display: flex;
          justify-content: center;
          color: #fff;
          font-size: 15px;
          margin: 0 15px;
        }
      }
    }
  }
`;
