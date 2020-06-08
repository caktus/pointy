import styled from 'styled-components';
import { phoneOnly } from '../../../styles/media';

export const PreviousTicketsStyled = styled.ul`
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;

    @media (${phoneOnly}) {
        margin-top: 4rem;
        flex-direction: column;
        align-items: center;
    }
`;
