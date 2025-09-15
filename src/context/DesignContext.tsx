import { createContext, useContext } from 'react';

interface DesignContextValue {
  openEditor: () => void;
}

export const DesignContext = createContext<DesignContextValue | null>(null);

export const useDesignContext = () => {
  const ctx = useContext(DesignContext);
  if (!ctx) {
    throw new Error('useDesignContext must be used within Layout');
  }
  return ctx;
};

