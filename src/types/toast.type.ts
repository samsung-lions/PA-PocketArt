export type ToastProps = {
  on: (toast: any) => void;
  off: (id: any) => void;
};
export type ToastType = {
  id: string;
  label: string;
};
