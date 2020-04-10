import React from 'react';
import GlobalStyle from './styles/GlobalStyle';
import { AppStyled, AppWrapperStyled } from "./App.styled";

// Rotuer
import { BrowserRouter, Switch,  Route } from "react-router-dom";
import ConnectedRoute from "./services/ConnectedRoute";

// Providers
import { AppProvider }from './providers/appProvider';

// Components
import GlobalHeader from "./components/elements/GlobalHeader/GlobalHeader";

// Pages
import NewRoomPage from './components/pages/NewRoomPage/NewRoomPage';
import AsyncStartPage from "./components/pages/StartPage/AsyncStartPage";
import AsyncRoomPage from './components/pages/RoomPage/AsyncRoomPage';

function App() {
  const appContext = {}
  // 🥞
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppProvider value={appContext}>
          <AppStyled>
            <AppWrapperStyled>
              <GlobalHeader />
              <Switch>
                <Route exact path="/">
                  <AsyncStartPage />
                </Route>
                <ConnectedRoute socket="home" path="/new">
                  <NewRoomPage />
                </ConnectedRoute>
                <ConnectedRoute socket="session" path="/:sessionId">
                  <AsyncRoomPage />
                </ConnectedRoute>
              </Switch>
            </AppWrapperStyled>
          </AppStyled>
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
