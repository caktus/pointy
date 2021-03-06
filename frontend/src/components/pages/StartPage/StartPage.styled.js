import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PageBaseStyled } from '../PageBase.styled';
import { colorBlue } from '../../../styles/colors';

// lib
import { Card } from "reaktus";


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
  margin-top: 5rem;
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
    
    cursor: ${props => props.onClick ? 'pointer' : 'default'};
    overflow: hidden;

    h3 {
        margin: 3rem 0 1rem 0;
        text-align: center;
    }
`;

export const StartPageRoomsListStyled = styled.ul`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 1rem 0 1rem;
    overflow-y: scroll;
`;

export const StartPageRoomStyled = styled(motion.li)`
    p {
        margin-bottom: .5rem;
        color: ${colorBlue};
        cursor: pointer;
    }
`;

export const CreateSessionCardStyled = styled.div`
    height: 75%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;