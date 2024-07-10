'use client';
import { ModalProps, ModalType } from '@/types/toast.type';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const initialValue: ModalProps = {
  modalOptions: null,
  on: () => {},
  off: () => {}
};

export const ConfirmContext = createContext(initialValue);

export const useConfirm = () => useContext(ConfirmContext);

export function ConfirmProvider({ children }: PropsWithChildren) {
  const [modalOptions, setModalOptions] = useState<ModalType | null>(null);
  const value = {
    modalOptions,
    on: (toast: ModalType) => {
      setModalOptions(toast);
    },
    off: () => {
      setModalOptions(null);
    }
  };
  return <ConfirmContext.Provider value={value}>{children}</ConfirmContext.Provider>;
}
