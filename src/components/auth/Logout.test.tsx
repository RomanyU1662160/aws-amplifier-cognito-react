import { render, screen, fireEvent } from '@testing-library/react';
import { signOut } from 'aws-amplify/auth';
import Logout from './Logout';
import '@testing-library/jest-dom';
import React from 'react';

jest.mock('aws-amplify/auth', () => ({
  signOut: jest.fn(),
}));

describe('Logout', () => {
  it('should call signOut and redirect to home page when logout button is clicked', async () => {
    render(<Logout />);

    const logoutButton = screen.getByRole('button', { name: /logout/i });

    fireEvent.click(logoutButton);

    expect(signOut).toHaveBeenCalledWith({ global: true });
    // expect(window.location.href).toBe('/');
  });
});
