'use client';
import { useConfirm } from '@/contexts/confirm.context';
import { ModalType } from '@/types/toast.type';
import Image from 'next/image';
import InfoIcon from '../../../public/icons/ic-info.png';
import BackDrop from '../BackDrop';
import Button from '../Button';
interface ModalProps {
  modalOptions: ModalType | null;
  handleClick: () => void | Promise<void>;
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

        <div className="flex flex-row w-full gap-x-3">
          <Button size={'half'} onClick={handleClick}>
            확인
          </Button>
          <Button size={'half'} intent={'submit'} onClick={() => modal.off()}>
            취소
          </Button>
        </div>
      </div>
    </BackDrop>
  );
}

export default ConfirmModal;
