import React from 'react';
import Auth from 'aws-amplify/auth';

interface ConfirmationDialogConfig {
  title: string;
  message: string;
  confirmCallback: () => void;
  cancelCallback: () => void;
}

export const showConfirmationDialog = (
  config: ConfirmationDialogConfig
): Promise<boolean> => {
  return new Promise((resolve) => {
    config.confirmCallback = () => {
      config.confirmCallback();
      resolve(true);
    };
    config.cancelCallback = () => {
      config.cancelCallback();
      resolve(false);
    };
    // Display the modal or dialog with the provided config
  });
};

export const revokeToken = async (token: string): Promise<void> => {
  try {
    // await Auth.revokeToken(token);
    await Auth.signOut({ global: true });
  } catch (error) {
    console.error('Error revoking token:', error);
  }
};
