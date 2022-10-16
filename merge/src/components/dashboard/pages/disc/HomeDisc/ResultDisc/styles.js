import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
  margin-top: 20px;
  max-width: 500px;
  height: 200px;
  display: flex;
  flex-direction: column;
  
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Chart = css`
  margin-top: 10px;
  width: 56px;
  margin: 0px 20px;
  border-radius: 10px 10px 0px 0px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    width: 34px;
  }
`;

export const Number = styled.span`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.color};
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
  background-image: linear-gradient(
    to bottom,
    ${(props) => props.colors[0]},
    ${(props) => props.colors[1]}
  );
  ${Chart};
`;

export const Span = styled.span`
   text-align: center;
   font-size: 15px;
    color: ${(props) => props.color};
`;

export const BlackLine = styled.div`
  width: 102.5%;
  height: 5px;
  background-color: rgb(62 62 62 / 93%);
`;
