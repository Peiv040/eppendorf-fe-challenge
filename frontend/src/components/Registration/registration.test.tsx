import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import Registration from '.';
import { validateEmail, validatePassword } from '../../utils/validator';
import lang from '../../locales/en.json';

vi.mock('../../utils/validator', () => ({
  validateEmail: vi.fn(),
  validatePassword: vi.fn(),
}));

describe('registration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<Registration />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  it('displays validation errors for invalid input', async () => {
    (validateEmail as Mock).mockReturnValue(false);
    (validatePassword as Mock).mockReturnValue(false);

    render(<Registration />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(lang.registration.errors.name)).toBeInTheDocument();
    expect(await screen.findByText(lang.registration.errors.email)).toBeInTheDocument();
    expect(await screen.findByText(lang.registration.errors.password)).toBeInTheDocument();
  });

  it('submits form when inputs are valid', async () => {
    (validateEmail as Mock).mockReturnValue(true);
    (validatePassword as Mock).mockReturnValue(true);

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Registration successful' }),
      })
    ) as unknown as typeof fetch;

    render(<Registration />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/register'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'test@example.com',
          password: 'StrongP@ss1',
        }),
      })
    );
  });

  it('displays an error if server returns an error', async () => {
    (validateEmail as Mock).mockReturnValue(true);
    (validatePassword as Mock).mockReturnValue(true);

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Some error' }),
      })
    ) as unknown as typeof fetch;

    render(<Registration />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongP@ss1' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Some error/i)).toBeInTheDocument();
  });
});
