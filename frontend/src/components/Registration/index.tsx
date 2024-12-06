import React from 'react';
import lang from '../../locales/en.json';

import './registration.css';

const RegistrationForm: React.FC = () => {
  return (
    <main id="registration">
        <h1>{lang.registration.title}</h1>
    </main>
  );
};

export default RegistrationForm;
