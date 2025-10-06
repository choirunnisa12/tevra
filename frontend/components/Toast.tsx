import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const showToast = ({ message, type }: ToastProps) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #10b981',
        },
      });
      break;
    case 'error':
      toast.error(message, {
        duration: 5000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #ef4444',
        },
      });
      break;
    case 'info':
      toast(message, {
        duration: 3000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #3b82f6',
        },
        icon: 'ℹ️',
      });
      break;
  }
};

export const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
        success: {
          style: {
            border: '1px solid #10b981',
          },
        },
        error: {
          style: {
            border: '1px solid #ef4444',
          },
        },
      }}
    />
  );
};
