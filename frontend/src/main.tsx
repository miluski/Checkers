import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './views/App.tsx'
import Screen_after_login from './views/Screen_after_login.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Screen_after_login />
  </React.StrictMode>,
)
