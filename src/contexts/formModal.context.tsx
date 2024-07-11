'use client';

import FanArtModal from '@/components/FanArtModal';
import { FanArtItemProps } from '@/types/FanArt.type';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type FormModalType = {
  open: (options: FanArtItemProps) => void;
  close: () => void;
};

const initialValue: FormModalType = {
  open: () => {},
  close: () => {}
};

const FormModalContext = createContext(initialValue);

export const useFormModal = () => useContext(FormModalContext);

export function FormModalProvider({ children }: PropsWithChildren) {
  const [modalOptions, setModalOptions] = useState<FanArtItemProps | null>(null);

  const value = {
    open: (options: FanArtItemProps) => {
      setModalOptions(options);
    },
    close: () => {
      setModalOptions(null);
    }
  };

  return (
    <FormModalContext.Provider value={value}>
      {children}
      {modalOptions && <FanArtModal postId={modalOptions.postId} fanArt={modalOptions.fanArt} />}
    </FormModalContext.Provider>
  );
}
