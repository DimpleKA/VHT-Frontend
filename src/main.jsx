import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import store from './store/store.js';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Auth0Provider
    domain="dev-farcynnuiewz53gu.us.auth0.com"
    clientId="d5ZrVgItD0TsAnlpbWUqlQZ4s3CRnHtv"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >

    <Provider store={store}>
         <App />
    </Provider>
  </Auth0Provider>,
  </StrictMode>,
)
