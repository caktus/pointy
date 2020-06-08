import styled from 'styled-components';
import { responsiveContentWell } from '../../../styles/variables';

export const RoomContentStyled = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100%;
`;

export const TicketSpace = styled.div`
    ${responsiveContentWell};
`;

export const RoomNameStyled = styled.h2`
    margin: 0 0 1rem 0;
`;

export const RoomContentWrapper = styled.div`
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
