import { useConfirm } from '@/contexts/confirm.context';
import { PropsWithChildren, useEffect } from 'react';

function BackDrop({ children }: PropsWithChildren) {
  const modal = useConfirm();
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="back-drop bg-black-rgba" onClick={() => modal.off()}>
      {children}
    </div>
  );
}

export default BackDrop;
