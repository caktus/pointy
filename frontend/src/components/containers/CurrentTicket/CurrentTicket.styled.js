import styled from 'styled-components';
import { colorGrey, colorGreyLight } from '../../../styles/colors';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from 'framer-motion';

export const CurrentTickerWrapper = styled.div`
    margin-top: 6rem;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const TicketName = styled(motion.h2)`
    margin-top: 0;
    align-self: center;
    font-size: 4rem;
    color: ${colorGrey};
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const CancelTicketIcon = styled(FontAwesomeIcon)`
    font-size: 16px;
    margin-left: 4rem;
    cursor: pointer;

    &:hover {
        color: ${colorGreyLight};
    }
`;

export const PhaseName = styled(motion.span)`
    color: ${colorGreyLight};
    margin-left: 2rem;
`;

export const CurrentTicketStyled = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
`;
