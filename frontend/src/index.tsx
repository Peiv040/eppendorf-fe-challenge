import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import Welcome from 'components/Welcome';

import './index.css';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode!);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  )
}

root.render(<StrictMode><App /></StrictMode>)
