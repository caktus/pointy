import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageBaseStyled } from '../PageBase.styled';
import { Input, Card } from "reaktus";
import { colorBlue } from '../../../styles/colors';

export const StartPageStyled = styled(PageBaseStyled)`
    display: flex;
    flex-direction: column;
`;

export const StartPageUsername = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const InputStyled = styled(Input)`
    & > input {
        font-size: 2rem;
        width: 24rem;
        height: 3rem;
        font-family: 'Inconsolata', monospace;
    }

    & > label {
        font-size: 1.5rem;
        font-family: 'Inconsolata', monospace;
    }
`;

export const StartPageActionCards = styled.div`
    margin-top: 8rem;
    align-self: center;
    width: 80%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export const CardStyled = styled(Card)`
    display: flex;
    flex-direction: column;
    height: 30rem;
    width: 23rem;
    padding: 1rem;
    margin: 0 5rem 5rem 0;
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
    overflow: hidden;
`;

export const StartPageRoomsListStyled = styled.ul`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1rem 0 1rem;
    overflow-y: scroll;
`;

export const StartPageRoomStyled = styled(motion.li)`
    margin-bottom: 1.5rem;
`;

export const CreateSessionCardStyled = styled.div`
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;