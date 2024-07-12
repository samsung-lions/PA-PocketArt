import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const buttonVariant = cva('font-semibold transition hover:brightness-110 active:brightness-125 hover:scale-105', {
  variants: {
    intent: {
      main: 'rounded bg-[#FFD400] text-[#212121]',
      submit: 'border-b-2 border-[#212121] text-[#212121] hover:shadow-md',
      cancel: 'border-b-2 border-slate-500 text-slate-500 hover:shadow-md'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-[15px]',
      lg: 'px-5 py-3 text-[17px]',
      half: 'w-1/2 text-[15px] py-2'
    },
    isDisabled: {
      true: 'cursor-not-allowed',
      false: ''
    }
  },
  defaultVariants: {
    intent: 'main',
    size: 'md',
    isDisabled: false
  }
});

type ButtonVariantProps = VariantProps<typeof buttonVariant>;

type ButtonProps = {} & ButtonVariantProps & ComponentProps<'button'>;

const Button = ({ intent, size, isDisabled, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariant({ intent, size, isDisabled })} disabled={isDisabled || false} {...props}>
      {children}
    </button>
  );
};

export default Button;
