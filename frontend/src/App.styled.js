import styled from 'styled-components';
import { smallerThanTabletLandscape } from './styles/media';

export const AppStyled = styled.div`
    min-height: 100vh;
    max-width: 100vw;
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
`;

export const AppWrapperStyled = styled.div`
    flex: 1;
    width: 100%;
    max-width: 90vw;
    display: flex;
    align-self: center;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 6rem;

    @media (${smallerThanTabletLandscape}) {
        max-width: 100vw;
        padding: 0 2rem;
    }
`;