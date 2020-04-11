import styled from 'styled-components';
import { motion } from 'framer-motion';

export const PrevTicketStyled = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 18rem;
    margin: 1rem;

    p {
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;
