import styled from "styled-components";
import { Colors } from "./colors";

export const Buttons = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: ${Colors.white};
  padding: 10px 20px 10px 20px;
  background-color: ${Colors.button};
  border-radius: 50%;
  cursor: pointer;
  outline-offset: 4px;
  transform: translateY(-6px);
  box-shadow: 3px 3px red, 5px 10px ${Colors.button};
  &:active {
    background-color: ${Colors.activeButton};
    color: ${Colors.white};
    transform: translateY(-2px);
    box-shadow: 3px 3px red, 1px 2px ${Colors.button};
  }
`;
export const SmallDisplay = styled.span`
  border-style: solid;
  border-width: 0.5px;
  border-color: ${Colors.button};
  background-color: ${Colors.matrixGreen};
  color: ${Colors.black};
  font-size: 7vh;
  padding: 0 20vw 0 20vw;
`;
export const MainScreen = styled.div`
  height: 38vh;
  width: 88vw;
  background-color: ${Colors.black};
  display: flex;
  justify-content: space-evenly;
`;
