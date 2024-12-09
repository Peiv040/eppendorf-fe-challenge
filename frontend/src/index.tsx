import React, { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

const Welcome = lazy(() => import('./components/Welcome'));
const Registration = lazy(() => import('./components/Registration'));
const SortableTable = lazy(() => import('./components/SortableTable'));

import './index.css';

const rootNode = document.getElementById('root');
const root = createRoot(rootNode!);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='registration' element={<Registration />} />
        <Route path='sortableTable' element={<SortableTable />} />
      </Routes>
    </BrowserRouter>
  )
}

root.render(<StrictMode><App /></StrictMode>)
