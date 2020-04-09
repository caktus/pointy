import { createGlobalStyle } from 'styled-components';
import normalize from './normalize';

export default createGlobalStyle`
    ${normalize}
    body {
        font-family: Arial, Helvetica, sans-serif;
    }
`;
