export type ToastProps = {
  on: (toast: any) => void;
  off: (id: any) => void;
};
export type ToastType = {
  id: string;
  label: string;
};

export type ModalProps = {
  modalOptions: ModalType | null;
  on: (toast: any) => void;
  off: () => void;
};
export type ModalType = {
  label: string | null;
};
