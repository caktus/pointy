import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colorPrimary, colorGrey } from '../../../../styles/colors';

export const UserStatusListStyled = styled(motion.ul)`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const AdminUserStyled = styled.li`
    margin-left: 4rem;
    color: ${(props) => props.current ? colorPrimary : colorGrey};
    font-weight: bold;
`;
