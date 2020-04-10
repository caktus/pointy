import styled from 'styled-components';
import { Card } from 'reaktus';
import { colorGrey, colorPrimary, colorBackground, colorWhite } from '../../../styles/colors';

export const VoteValueStyled = styled(Card)`
    height: 20rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background-color: ${props => props.selected ? colorPrimary : colorBackground };
`;

export const ValueStyled = styled.h2`
    color: ${props => props.selected ? colorWhite : colorGrey };
    font-size: 10rem;
`;
