import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import lang from '../../locales/en.json';

import './registration.css';

interface IErrors { [key: string]: string };

const RegistrationForm: React.FC = () => {
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<IErrors>({});

  const validateEmail = (email: string) => emailRegex.test(email);

  const validatePassword = (password: string) =>
    passwordRegex.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: IErrors = {};

    if (name.length < 2) newErrors.name = lang.registration.errors.name;
    if (!validateEmail(email)) newErrors.email = lang.registration.errors.email;
    if (!validatePassword(password)) newErrors.password = lang.registration.errors.password;

      setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log({ name, email, password });

      try {
        const response = await fetch("http://localhost:3001/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error || "Something went wrong");
          return;
        }
    
        const responseData = await response.json();
        alert(responseData.message || lang.registration.successMessage);
      } catch (error) {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <main id="registration">
      <form onSubmit={handleSubmit}>
        <h1>{lang.registration.title}</h1>

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
          helperText={errors.password}
        />

        <Button variant='contained' type="submit">Register</Button>
      </form>
    </main>
  );
};

export default RegistrationForm;
