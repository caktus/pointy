import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { AppStyled, AppWrapperStyled } from "./App.styled";

// Rotuer
import { BrowserRouter, Switch,  Route } from "react-router-dom";

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
      <SocketProvider path='/pointy/'>
      <BrowserRouter>
        <AppProvider value={appContext}>
          <AppStyled>
            <AppWrapperStyled>
              <GlobalHeader />
              <Switch>
                <Route exact path="/">
                  <StartPage />
                </Route>
                <Route path="/new">
                  <NewRoomPage />
                </Route>
                <Route path="/:room">
                  <RoomPage />
                </Route>
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
