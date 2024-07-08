import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import BackButton from '../BackButton/BackButton';

interface PageProps {
  title?: string;
  width?: 'md' | 'lg';
  hasBackButton?: boolean;
}

const pageVariant = cva('mx-auto flex flex-col items-center px-2 py-10 bg-white', {
  variants: {
    width: {
      md: 'max-w-[768px]',
      lg: 'max-w-[1024px]'
    }
  },
  defaultVariants: {
    width: 'lg'
  }
});

const Page = ({ title = '', width, hasBackButton = false, children }: PropsWithChildren<PageProps>) => {
  return (
    <main className={pageVariant({ width })}>
      {hasBackButton && <BackButton />}
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {children}
    </main>
  );
};

export default Page;
