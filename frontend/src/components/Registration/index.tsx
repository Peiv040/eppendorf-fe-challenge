import React from 'react';
import lang from '../../locales/en.json';

const RegistrationForm: React.FC = () => {
  return (
    <main id="registration">
        <Typography variant='h4'>{lang.registration.title}</Typography>
    </main>
  );
};

export default RegistrationForm;
