import styled from 'styled-components';
import { PageBaseStyled } from '../PageBase.styled';
import { colorPrimary } from '../../../styles/colors';

import { Button } from "reaktus";
import Input from '../../elements/Input/Input';

export const NewRoomPageStyled = styled(PageBaseStyled)``;


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


    & > p {
        margin-bottom: 2rem;
    }

    & > div {
        display: flex;
        flex-direction: column;
    }
`;


export const InputStyled = styled(Input)`
  & > input {
    width: 50rem;
    padding: 1rem;
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
