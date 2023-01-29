import { Link, Navigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from './colors';

export const MainWrapper = styled.div`
  min-height: 70vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5em;
`;
export const Input = styled.input`
  height: 2em;
  width: 30em;
  padding: 0.5em;
  margin: 0.5em;
  background-color: ${Colors.lighterGreen};
  color: ${Colors.gold};
  border-color: ${Colors.mainGreen};
  border-width: 1px;
  border-radius: 10px;
  font-size: large;
  :focus {
    border: 1px solid ${Colors.gold};
    outline: none;
  }

  ::placeholder {
    color: ${Colors.gold};
    opacity: 0.5;
  }

  @media screen and (max-width: 768px) {
    width: 15em;
  }
`;
export const Buttons = styled.button`
  margin: 1em;
  background-color: ${Colors.gold};
  color: ${Colors.lighterGreen};
  cursor: pointer;
  border-radius: 10px;

  :hover {
    background-color: ${Colors.red};
    color: ${Colors.gold};
  }
`;
export const TextButtons = styled(NavLink)`
  font-size: larger;
  font-weight: bold;
  cursor: pointer;
  margin: 0.5em;
  color: ${Colors.gold};

  :visited {
    text-decoration: none;
  }

  :hover {
    text-decoration: underline;
    color: ${Colors.red};
  }
`;

export const LoginButton = styled(Buttons)`
  height: 2.5em;
  width: 31em;
  font-size: large;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    width: 16em;
  }
`;

export const Logo = styled.img`
  width: 15em;
`;

export const ErrorText = styled.div`
  font-size: larger;
  font-weight: bold;
  color: ${Colors.red};
  width: 80%;
  align-self: center;
  text-align: center;
`;
export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
export const Deck = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;

  @media screen and (max-width: 520px) {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(auto, auto);
    max-width: 50%;
    align-items: center;
    align-content: center;
  }
`;

export const CardContainer = styled.div`
  background-color: white;
  width: 7em;
  height: 10em;
  color: black;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 1em;
`;
export const TopCard = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 33%;
  font-size: x-large;
  padding: 5px;
`;
export const BottomCard = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 33%;
  align-items: flex-end;
  font-size: x-large;
  padding: 5px;
`;
export const MiddleCard = styled.div`
  display: flex;
  justify-content: center;
  height: 33%;
  align-items: center;
  font-size: x-large;
`;
