import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { AppStyled, AppWrapperStyled } from "./App.styled";

// Rotuer
import { BrowserRouter, Switch,  Route } from "react-router-dom";
import ConnectedRoute from "./services/ConnectedRoute";

// Providers
import { AppProvider }from './providers/appProvider';
import { SocketProvider } from "./providers/socketProvider";

// Components
import GlobalHeader from "./components/elements/GlobalHeader/GlobalHeader";

// Pages
import StartPage from './components/pages/StartPage/StartPage';
import NewRoomPage from './components/pages/NewRoomPage/NewRoomPage';
import RoomPage from './components/pages/RoomPage/RoomPage';

function App() {
  const appContext = {}
  // 🥞
  return (
    <>
      <GlobalStyle />
      <SocketProvider path="">
        <BrowserRouter>
          <AppProvider value={appContext}>
            <AppStyled>
              <AppWrapperStyled>
                <GlobalHeader />
                <Switch>
                  <Route exact path="/">
                    <StartPage />
                  </Route>
                  <ConnectedRoute path="/new">
                    <NewRoomPage />
                  </ConnectedRoute>
                  <ConnectedRoute path="/:sessionId">
                    <RoomPage />
                  </ConnectedRoute>
                </Switch>
              </AppWrapperStyled>
            </AppStyled>
          </AppProvider>
        </BrowserRouter>
      </SocketProvider>
    </>
  );
}

export default App;
