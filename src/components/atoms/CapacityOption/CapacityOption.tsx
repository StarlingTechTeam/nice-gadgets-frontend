import { useTheme } from '@hooks/useTheme';
import './CapacityOption.scss';

type CapacityOptionProps = {
  value: string;
  selected: boolean;
  onClick: () => void;
};

const CapacityOption = ({ value, selected, onClick }: CapacityOptionProps) => {
  const { theme } = useTheme();

  return (
    <button
      className={`option cursor-pointer ${selected ? 'selected' : ''} ${
        theme === 'dark' ? 'text-primary' : ''
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};
export default CapacityOption;
