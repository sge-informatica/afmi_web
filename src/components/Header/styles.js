import styled from "styled-components";
import { darken } from "polished";

export const Container = styled.div`
  background: #ddd;
  padding: 0 30px;
`;

export const Text = styled.p`
  margin-top: 2px;
  display: block;
  font-size: 12px;
  color: #888;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      width: 70px;
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #595959;
      transition: color, 0.3s;

      &:hover {
        color: ${darken(0.1, "#444")};
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      font-size: 12px;
      font-weight: bold;
      color: #3b4e33;
      transition: color 0.2s;

      &:hover {
        color: ${darken(0.1, "#3B4E33")};
      }
    }
  }
`;
