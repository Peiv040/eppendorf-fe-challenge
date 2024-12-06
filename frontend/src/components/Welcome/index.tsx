import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import lang from '../../locales/en.json';

import './welcome.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main id='welcome'>
      <h1>{lang.welcome.title}</h1>
      <Button variant='contained' onClick={() => navigate('/registration')}>{lang.registration.title}</Button>
      <Button variant='contained' onClick={() => navigate('/sortableTable')}>{lang.sortableTable.title}</Button>
    </main>
  );
};

export default Welcome;
