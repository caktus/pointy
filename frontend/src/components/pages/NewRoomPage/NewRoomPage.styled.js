import styled from 'styled-components';
import { PageBaseStyled } from '../PageBase.styled';
import { colorPrimary } from '../../../styles/colors';

import { Button } from "reaktus";
import Input from '../../elements/Input/Input';
import { smallerThanTabletLandscape } from "../../../styles/media";

export const NewRoomPageStyled = styled(PageBaseStyled)`
    flex-direction: column;
`;


export const NewRoomHeading = styled.div`

    display: inline-block;
    h1 {
        display: inline-block;
        span {
            color: ${colorPrimary};
        }
    }
`;

export const NewRoomForm = styled.div`
    flex: 1;
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    max-width: 50rem;


    & > p {
        margin-bottom: 2rem;
    }

    & > div {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
    }

    @media (${smallerThanTabletLandscape}) {
        margin-top: 4rem;
    }
`;

export const InputWrapper = styled.div`
    width: 100%;
    margin-bottom: 4rem;

    select {
        width: 100%;
    }
`;


export const InputStyled = styled(Input)`
  & > input {
    width: 100%;
    padding: 2.5rem;
    box-sizing: border-box;
  }

  & > label {
    left: 5%;
  }

`;

export const ButtonStyled = styled(Button)`
    font-size: 2rem;
    font-family: 'Inconsolata', monospace;
    margin-top: 4rem;
    align-self: flex-end;
`;
