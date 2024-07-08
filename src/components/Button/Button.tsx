import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const buttonVariant = cva('font-semibold transition hover:brightness-90 active:brightness-75 hover:scale-105', {
  variants: {
    intent: {
      main: 'rounded bg-[#FFD400] text-[#212121]',
      submit: 'border-b-2 border-[#212121] text-[#212121] hover:shadow-md',
      cancel: 'border-b-2 border-slate-500 text-slate-500 hover:shadow-md'
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-[15px]',
      lg: 'px-5 py-2.5 text-[17px]'
    }
  },
  defaultVariants: {
    intent: 'main',
    size: 'md'
  }
});

type ButtonVariantProps = VariantProps<typeof buttonVariant>;

type ButtonProps = {} & ButtonVariantProps & ComponentProps<'button'>;

const Button = ({ intent, size, children, ...props }: ButtonProps) => {
  return (
    <button className={buttonVariant({ intent, size })} {...props}>
      {children}
    </button>
  );
};

export default Button;
