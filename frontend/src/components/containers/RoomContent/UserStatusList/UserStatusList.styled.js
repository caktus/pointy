import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colorPrimary, colorGrey } from '../../../../styles/colors';
import { phoneOnly } from '../../../../styles/media';

export const UserStatusListStyled = styled(motion.ul)`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (${phoneOnly}) {
        flex-direction: column;
    }

`;

export const AdminUserStyled = styled.li`
    margin-left: 4rem;
    color: ${(props) => props.current ? colorPrimary : colorGrey};
    font-weight: bold;

    @media (${phoneOnly}) {
        margin: 2rem 0;
    }
`;
