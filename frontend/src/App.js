import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { AppStyled } from './App.styled';

// Config
import * as config from './config/config';

// Providers
import { SocketProvider } from "./providers/socketProvider";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyle />
      <SocketProvider url={config.SOCKET_URL} opts={config.SOCKET_OPTIONS}>
        <BrowserRouter>
          <AppStyled>
            <h1>the app</h1>
          </AppStyled>
        </BrowserRouter>
      </SocketProvider>
    </>
  );
}

export default App;
