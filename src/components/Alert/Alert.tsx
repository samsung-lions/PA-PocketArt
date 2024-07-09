import { ToastType } from '@/types/toast.type';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CloseIcon from '../../../public/icons/ic-close.png';
import InfoIcon from '../../../public/icons/ic-info.png';
interface AlertProps {
  toast: ToastType;
}

const alertVariants = cva(
  'bg-gray-200 border border-l-4 border-l-gray-500 w-[300px] translation rounded-md px-4 py-3 shadow-sm flex flex-row justify-between items-center duration-500',
  {
    variants: {
      isDisplayed: {
        true: 'translate-y-[calc(20px)]',
        false: 'translate-y-[calc(-100%)]'
      }
    },
    defaultVariants: {
      isDisplayed: false
    }
  }
);
function Alert({ toast }: AlertProps) {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  useEffect(() => {
    setIsDisplayed(true);
    setTimeout(() => setIsDisplayed(false), 2000 - 500);
  }, []);

  const handleDelete = () => {
    setIsDisplayed(false);
  };
  return (
    <div className={alertVariants({ isDisplayed })}>
      <div className="flex flex-row gap-3">
        <Image src={InfoIcon} width={25} height={25} alt={'info icon'} />
        <span>{toast.label}</span>
      </div>

      <div>
        <Image
          src={CloseIcon}
          width={15}
          height={15}
          alt={'close button'}
          className="hover:cursor-pointer"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default Alert;
