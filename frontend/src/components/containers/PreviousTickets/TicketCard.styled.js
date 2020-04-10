import styled from 'styled-components';
import { Card } from 'reaktus';
import { colorGrey, colorPrimary, colorBackground } from '../../../styles/colors';

export const TicketCardStyled = styled(Card)`
    min-height: 15rem;
    min-width: 12rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    background-color: ${props => props.selected ? colorPrimary : colorBackground};
`;

export const TicketValueStyled = styled.h2`
    color: ${colorGrey};
    font-size: 5rem;
    margin: 0;
`;
