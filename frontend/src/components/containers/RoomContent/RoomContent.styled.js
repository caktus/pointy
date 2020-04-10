import styled from 'styled-components';
import { motion } from 'framer-motion';

export const RoomContentStyled = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;


export const RoomContentTop = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const WaitingForTicket = styled(motion.h3)`
    margin-top: 4rem;

    span {
        margin-left: 1rem;
    }
`;
