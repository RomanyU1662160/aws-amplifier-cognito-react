import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Logout from '../Logout';
import * as AuthUtils from '../../../lib/utils';
import Auth from 'aws-amplify/auth';
// import '@testing-library/jest-dom';

jest.mock('aws-amplify', () => ({
  Auth: {
    currentSession: jest.fn().mockResolvedValue({
      getAccessToken: () => ({ getJwtToken: () => 'mock-token' }),
    }),
    revokeToken: jest.fn(),
    signOut: jest.fn(),
  },
}));

jest.mock('../../../lib/utils', () => ({
  showConfirmationDialog: jest.fn(),
  revokeToken: jest.fn(),
}));

describe('Logout component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the logout button', () => {
    render(<Logout />);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('shows confirmation dialog and logs out on confirmation', async () => {
    const mockConfirmCallback = jest.fn();
    (AuthUtils.showConfirmationDialog as jest.Mock).mockResolvedValueOnce(true);
    render(<Logout />);

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => expect(mockConfirmCallback).toHaveBeenCalled());
    expect(Auth.signOut).toHaveBeenCalledWith({ global: true });
  });

  it('cancels logout on confirmation dialog cancel', async () => {
    (AuthUtils.showConfirmationDialog as jest.Mock).mockResolvedValueOnce(
      false
    );
    render(<Logout />);

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() => expect(Auth.signOut).not.toHaveBeenCalled());
  });

  it('revokes token before logout on confirmation', async () => {
    (AuthUtils.showConfirmationDialog as jest.Mock).mockResolvedValueOnce(true);
    render(<Logout />);

    fireEvent.click(screen.getByText('Logout'));
    await waitFor(() =>
      expect(AuthUtils.revokeToken).toHaveBeenCalledWith('mock-token')
    );
  });
});
