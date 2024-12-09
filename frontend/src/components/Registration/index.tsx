import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import lang from '../../locales/en.json';
import { validateEmail, validatePassword } from '../../utils/validator';

import './registration.css';

interface IErrors { [key: string]: string };

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<IErrors>({});
  const [feedback, setFeedback] = useState<{ message: string, severity: AlertColor } | null>(null);

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: IErrors = {};

    if (name.length < 2) newErrors.name = lang.registration.errors.name;
    if (!validateEmail(email)) newErrors.email = lang.registration.errors.email;
    if (!validatePassword(password)) newErrors.password = lang.registration.errors.password;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setFeedback({ message: errorData.error || "Something went wrong", severity: 'error' });
          return;
        }

        const responseData = await response.json();
        setFeedback({ message: responseData.message || lang.registration.successMessage, severity: 'success' });
        reset();
      } catch (error) {
        setFeedback({ message: "An unknown error occurred", severity: 'error' });
      }
    }
  };

  return (
    <main id="registration">
      <form onSubmit={handleSubmit}>
        {feedback && <Alert severity={feedback.severity}>{feedback.message}</Alert>}

        <Typography variant='h4'>{lang.registration.title}</Typography>

        <TextField
          id="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          type='password'
          id="password"
          label="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
          error={!!errors.password}
          helperText={lang.registration.errors.password}
        />

        <Button variant='contained' type="submit">{lang.registration.register}</Button>
      </form>
    </main>
  );
};

export default RegistrationForm;
