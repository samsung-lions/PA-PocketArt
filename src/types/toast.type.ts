export type ToastProps = {
  on: (toast: ToastType) => void;
  off: (id: string) => void;
};
export type ToastType = {
  id?: string;
  label: string;
};

export type ModalProps = {
  modalOptions: ModalType | null;
  on: (toast: ModalType) => void;
  off: () => void;
};
export type ModalType = {
  label: string | null;
};
