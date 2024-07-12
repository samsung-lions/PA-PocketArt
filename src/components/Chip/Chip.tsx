import { cva } from 'class-variance-authority';

interface ChipProps {
  id: string;
  label: string;
  intent?: 'yellow' | 'green' | 'default';
}

const chipVariants = cva('bg-white text-sm border rounded-full px-2.5 py-0.5', {
  variants: {
    intent: {
      yellow: 'border-yellow-600 text-yellow-600',
      green: 'border-green-600 text-green-600',
      default: 'border-gray-300 text-black'
    }
  },
  defaultVariants: {
    intent: 'default'
  }
});

const Chip = ({ id, label, intent }: ChipProps) => {
  return (
    <div id={id} className={chipVariants({ intent })}>
      {label}
    </div>
  );
};

export default Chip;
