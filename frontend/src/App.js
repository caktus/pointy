import React, { useState, createContext } from "react";
import GlobalStyle from './styles/GlobalStyle';
import { AppStyled, AppWrapperStyled } from "./App.styled";

// Rotuer
import { BrowserRouter, Switch,  Route } from "react-router-dom";
import ConnectedRoute from "./services/ConnectedRoute";

// Components
import GlobalHeader from "./components/elements/GlobalHeader/GlobalHeader";

// Pages
import AsyncStartPage from "./components/pages/StartPage/AsyncStartPage";
import AsyncRoomPage from './components/pages/RoomPage/AsyncRoomPage';

export const MainContext = createContext();

function App() {
  const [user, setUser] = useState();
  // 🥞
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AppStyled>
          <AppWrapperStyled>
            <MainContext.Provider value={{ user, setUser }}>
              <GlobalHeader />
              <Switch>
                <Route exact path="/">
                  <AsyncStartPage />
                </Route>
                <ConnectedRoute socket="session" path="/:sessionId">
                  <AsyncRoomPage />
                </ConnectedRoute>
              </Switch>
            </MainContext.Provider>
          </AppWrapperStyled>
        </AppStyled>
      </BrowserRouter>
    </>
  );
}

export default App;
