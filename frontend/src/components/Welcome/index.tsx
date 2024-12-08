import React from 'react';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import lang from 'locales/en.json';

import './welcome.css';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main id='welcome'>
      <Typography variant='h2'>{lang.welcome.title}</Typography>
      <Button variant='contained' onClick={() => navigate('/registration')}>{lang.registration.title}</Button>
      <Button variant='contained' onClick={() => navigate('/sortableTable')}>{lang.sortableTable.title}</Button>
    </main>
  );
};

export default Welcome;
