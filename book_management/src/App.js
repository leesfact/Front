import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import AuthRouteReactQuery from './components/UI/Routes/AuthRoute/AuthRouteReactquery';

function App() {

  return (
    <>
      <Global styles={Reset} />
      <Routes>
        <Route exact path="/login" element={<AuthRouteReactQuery path="/login" element={<Login />} />} />
        <Route path="/register" element={<AuthRouteReactQuery path="/register" element={<Register />} />} />
        <Route path="/" element={<AuthRouteReactQuery path="/" element={<Main />} />} />
        <Route path="/admin/search" element={<AuthRouteReactQuery path="/admin/search" element={<Main />} />} />
      </Routes>
    </>
  );
}

export default App;
