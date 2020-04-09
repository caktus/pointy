import React from 'react';
import { GlobalHeaderStyled } from './GlobalHeader.styled';

// Components
import PointyLogo from '../PointyLogo/PointyLogo';

const GlobalHeader = props => {
  return (
    <GlobalHeaderStyled>
      <PointyLogo />
    </GlobalHeaderStyled>
  );
}

export default GlobalHeader;
