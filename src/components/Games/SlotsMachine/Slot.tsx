import { FC } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../entities/colors';
import { IItems } from '../../../entities/items';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const OneSlot = styled.div`
  background-color: ${Colors.white};
  width: 30%;
  display: block;
  overflow: hidden;
  position: static;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
  float: center;
`;
const Column = styled.span`
  background-color: ${Colors.white};
  width: 100%;
`;
const Item = styled.span`
  display: block;
`;
interface ISlot {
  items: IItems[];
  time: number;
}
export const Slot: FC<ISlot> = (props) => {
  const slotStyle = (): string => {
    if (props.time === 1000) return 'first';
    if (props.time === 2000) return 'second';
    return 'third';
  };
  return (
    <OneSlot>
      <div className='items'>
        <TransitionGroup component='span' key={props.time}>
          <CSSTransition
            classNames={slotStyle()} //{props.time === 1000 ? 'first' : 'second'} //'it'
            timeout={{ enter: props.time, exit: props.time }}
            key={Math.random()}
            unmountOnExit
          >
            <Column className='items__value'>
              {props.items?.length > 0 &&
                props.items.map((el, index) => {
                  return <Item key={index + props.time}>{el.img}</Item>;
                })}
            </Column>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </OneSlot>
  );
};
