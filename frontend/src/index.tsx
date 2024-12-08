import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Navigation from 'components/Navigation';
import Welcome from 'components/Welcome';
import Registration from 'components/Registration';

import './index.css';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode!);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='registration' element={<Registration />} />
      </Routes>
    </BrowserRouter>
  )
}

root.render(<StrictMode><App /></StrictMode>)
