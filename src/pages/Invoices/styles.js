import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(-90deg, #cacaca, #dadada);

  h2 {
    text-align: center;
    font-size: 18px;
    color: #595959;
    margin: 50px 0 20px 0;
  }

  strong {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    font-size: 18px;
  }

  img {
    margin-left: 10px;
  }
`;

export const Article = styled.div`
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  color: #000;
  padding: 3px 0 3px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;
  margin: 0 -15px 0 -15px;
  font-weight: bold;
  font-size: 14px;

  strong {
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    margin: 5px 0 5px 0;
  }

  a {
    font-size: 14px;
    color: #333;
    font-weight: bold;
    text-decoration: underline;
    transition: 0.2s;

    &:hover {
      color: #000;
      font-size: 15px;
    }
  }

  p {
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 13px;
    margin: 10px 0;
  }

  button {
    background: transparent;
    margin-top: 8px;
    border: 0;
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
  margin-top: 85px;
  align-items: center;
`;

export const Paginate = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0 30px 0;

  button {
    padding: 0 10px;
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
  }
`;

export const Page = styled.p`
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
