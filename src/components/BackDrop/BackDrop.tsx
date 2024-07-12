import { useConfirm } from '@/contexts/confirm.context';
import { PropsWithChildren } from 'react';

function BackDrop({ children }: PropsWithChildren) {
  const modal = useConfirm();

  return (
    <div className="back-drop bg-black-rgba" onClick={() => modal.off()}>
      {children}
    </div>
  );
}

export default BackDrop;
