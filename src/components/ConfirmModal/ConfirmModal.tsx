'use client';
import { useConfirm } from '@/contexts/confirm.context';
import { ModalType } from '@/types/toast.type';
import Image from 'next/image';
import InfoIcon from '../../../public/icons/ic-info.png';
import BackDrop from '../BackDrop';
interface ModalProps {
  modalOptions: ModalType | null;
  handleClick: () => void;
}
function ConfirmModal({ modalOptions, handleClick }: ModalProps) {
  const modal = useConfirm();
  return (
    <BackDrop>
      <div className="bg-white border rounded-md p-4 w-[320px] shadow-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row gap-2 justify-center">
          <Image src={InfoIcon} width={25} height={25} alt={'info icon'} />
          <span>시스템알림</span>
        </div>
        <h1 className="font-semibold text-xl my-8 text-center">{modalOptions!.label}</h1>

        <div className="flex flex-row gap-3 justify-between">
          <button onClick={handleClick}>확인</button>
          <button onClick={() => modal.off()}>취소</button>
        </div>
      </div>
    </BackDrop>
  );
}

export default ConfirmModal;
