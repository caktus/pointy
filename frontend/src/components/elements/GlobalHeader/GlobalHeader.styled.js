import styled from 'styled-components';
import { keyAndAmbientShadows } from '../../../styles/shadows';

export const GlobalHeaderStyled = styled.header`
    display: flex;
    flex-direction: row;
    /* justify-content: space-between; */
    align-items: center;
    height: 5rem;
    width: 100%;

    padding: 0 5rem;

    ${keyAndAmbientShadows.dp6};
`;
