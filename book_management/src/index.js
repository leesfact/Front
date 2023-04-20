import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RecoilRoot, atom, selector } from 'recoil';

export const authenticated = atom({
  key: "authenticated",
  default: false
})

export const authenticatedState = selector( { 
  key: "authenticatedState",
  get: ({ get }) => {
    const auth = get(authenticated);
    return auth;
  }
 })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
