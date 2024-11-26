"use client";
import { useEffect } from 'react';

const BootstrapLoader = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .catch(err => console.error('Bootstrap JS import failed:', err));
  }, []);

  return null;
};

export default BootstrapLoader;
