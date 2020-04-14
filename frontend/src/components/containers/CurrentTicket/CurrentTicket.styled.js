import styled from 'styled-components';
import { colorGrey } from '../../../styles/colors';
import { motion } from 'framer-motion';

export const CurrentTickerWrapper = styled.div`
    margin-top: 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const TicketName = styled(motion.h2)`
    margin-top: 0;
    text-align: center;
    font-size: 4rem;
    color: ${colorGrey};
`;

export const CurrentTicketStyled = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;
