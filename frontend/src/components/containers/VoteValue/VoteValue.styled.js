import styled, { css } from 'styled-components';
import { Card } from 'reaktus';
import { colorGrey, colorPrimary, colorBackground, colorWhite } from '../../../styles/colors';

export const VoteValueStyled = styled(Card)`
    position: relative;
    height: 20rem;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${(props) => props.interactive ? 'pointer' : 'default'};

    background-color: ${(props) => props.selected ? colorPrimary : colorBackground};

    ${props => {
        if (props.filled) {
            return css`
              &:after {
                content: "";
                position: absolute;
                border-radius: ${props.filled === 100 ? '20px' : '4px'};
                bottom: 0;
                left: 0;
                width: 100%;
                height: ${props.filled}%;
                transform-origin: bottom center;
                background: ${colorPrimary};
                z-index: 1;
                transition: transform 0.3s ;
                transition-timing-function: cubic-bezier(.29,-0.18,.66,1.18);
              }
            `;
        }
    }}
`;

export const ValueStyled = styled.h2`
    color: ${props => {
        if (props.filled) {
            return props.filled === 100 ? colorWhite : colorGrey;
        } else {
            return props.selected ? colorWhite : colorGrey;
        }
    }};
    font-size: 10rem;
    z-index: 2;
`;
