import React, { useCallback, useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import Alert, { AlertColor } from '@mui/material/Alert';
import lang from '../../locales/en.json';
import { validateEmail, validatePassword } from '../../utils/validator';
import { IUser } from '../../models/User';
import { registerUser } from '../../api/user';

import './registration.css';

interface IErrors { [key: string]: string };

const RegistrationForm: React.FC = () => {
  const defaultFormValues: IUser = { name: '', email: '', password: '' };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IUser>(defaultFormValues);
  const [errors, setErrors] = useState<IErrors>({});
  const [feedback, setFeedback] = useState<{ message: string, severity: AlertColor } | null>(null);
  
  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  }, []);

  const reset = () => {
    setFormData(defaultFormValues);
    setErrors({});
  }

  const validateForm = (data: typeof formData): IErrors => {
    const validationErrors: IErrors = {};
    
    if (data.name.length < 2) validationErrors.name = lang.registration.errors.name;
    if (!validateEmail(data.email)) validationErrors.email = lang.registration.errors.email;
    if (!validatePassword(data.password)) validationErrors.password = lang.registration.errors.password;
    
    return validationErrors;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const errors = validateForm(formData);
    setErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      try {
        const response = await registerUser(formData);
        setFeedback({ message: response.message || lang.registration.successMessage, severity: 'success' });
        reset();
      } catch (error) {
        if (error instanceof Error) {
          setFeedback({ message: error.message, severity: 'error' });
        } else {
          setFeedback({ message: lang.registration.errors.generic, severity: 'error' });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="registration">
      <form onSubmit={handleSubmit}>
        {feedback &&
          <Alert severity={feedback.severity}>
            {feedback.message}
          </Alert>
        }

        <Typography variant='h4'>{lang.registration.title}</Typography>

        <TextField
          id="name"
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />

        <TextField
          id="email"
          label="Email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />

        <TextField
          type='password'
          id="password"
          label="Password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={!!errors.password}
          helperText={lang.registration.errors.password}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />

        <Button
          variant='contained'
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? lang.registration.submitting : lang.registration.register}
        </Button>
      </form>
    </main>
  );
};

export default RegistrationForm;
