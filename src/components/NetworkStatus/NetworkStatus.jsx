import React, { useEffect, useState } from 'react';
import { Alert } from 'antd';

function NetworkStatus({ onStatusChange }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      onStatusChange(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
      onStatusChange(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onStatusChange]);

  return isOnline ? null : (
    <Alert
      message="You are offline"
      description="Please check your internet connection"
      type="error"
      showIcon
    />
  );
}

export default NetworkStatus;
