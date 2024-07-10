'use client';

import Alert from '@/components/Alert';
import { ToastProps, ToastType } from '@/types/toast.type';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const initialValue: ToastProps = {
  on: () => {},
  off: () => {}
};

export const ToastContext = createContext(initialValue);

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  const value: ToastProps = {
    on: (toast) => {
      const id = crypto.randomUUID();
      if (toasts.some((t) => t.label === toast.label)) return;
      setToasts((prev) => [...prev, { ...toast, id }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 2000);
    },
    off: (id) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }
  };
  return (
    <ToastContext.Provider value={value}>
      {toasts.length > 0 && (
        <ul className="fixed right-6 z-20 grid grid-cols-1 gap-y-3">
          {toasts.map((toast: ToastType) => (
            <li key={toast.id}>
              <Alert toast={toast} />
            </li>
          ))}
        </ul>
      )}
      {children}
    </ToastContext.Provider>
  );
}
