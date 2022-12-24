import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from './colors';

export const MainWrapper = styled.div`
  background-color: ${Colors.mainGreen};
  height: 80vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
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
export const TextButtons = styled(Link)`
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

export const ErrorText = styled.div`
  font-size: larger;
  font-weight: bold;
  color: ${Colors.red};
`;