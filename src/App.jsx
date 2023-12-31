import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Reset } from 'styled-reset';
import Sidebar from './components/Sidebar';
import { AuthContextProvider } from './context/authContext';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Noto Sans TC', sans-serif;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <AuthContextProvider>
        <Sidebar />
        <Outlet />
      </AuthContextProvider>
    </>
  );
}

export default App;
