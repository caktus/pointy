import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colorGrey, colorPrimary, colorGreyLight } from '../../../../styles/colors';
import { smallerThanTabletLandscape } from '../../../../styles/media';

export const UserListItemStyled = styled(motion.li)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 6rem;

    @media (${smallerThanTabletLandscape}) {
        margin: 2rem 0;
    }
`;


export const UserVote = styled(motion.p)`
    margin: 0;
    color: ${colorPrimary};
    font-size: 2.5rem;
`;

export const LineStyled = styled(motion.span)`
    border-bottom: 1px solid ${colorGreyLight};
    width: 1.5rem;
    height: 0px;
`;

export const UserName = styled.p`
    margin: 0 0 0 1.5rem;
    color: ${props => props.current ? colorPrimary : colorGrey};
    display: inline-block;
    text-align: right;
    
`;
