import styled from "styled-components";

export const Wrapper = styled.div`
  background: linear-gradient(-90deg, #cacaca, #dadada);
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto 0;
  padding: 0 30px 10px 30px;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 15px;
  }
`;

export const LoaderDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
  align-items: center;
`;

export const Article = styled.div`
  background: #595959;
  border: 3px solid #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;

  strong {
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    margin: 5px 0 5px 0;
  }

  p {
    display: flex;
    justify-content: center;
    color: #fff;
    font-size: 13px;
    margin: 10px 0;
  }
`;

export const Value = styled.text`
  display: flex;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 13px;
  margin: 10px 0;
`;

export const Historic = styled.text`
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
`;

export const TransactionType = styled.text`
  margin-left: 5px;
  color: #f64c75;
`;

export const Canceled = styled.text`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0;
  font-weight: bold;
  color: #f64c75;
`;

export const Paginate = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 20px 0;

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
  width: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #595959;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
`;
