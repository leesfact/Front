import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Main from './pages/Main/Main';
import AuthRoute from './components/UI/Routes/AuthRoute/AuthRoute';
import { useRecoilValue } from 'recoil';
import { authenticated } from './index'; 

function App() {

  

  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <AuthRoute authenticated={useRecoilValue(authenticated)} element={<Main />} />
          // Token이 발행되면 authenticated = {useRecoilValue(authenticated)} 로 true/false 값을 가짐 
        } />
      </Routes>
    </>
  );
}

export default App;
