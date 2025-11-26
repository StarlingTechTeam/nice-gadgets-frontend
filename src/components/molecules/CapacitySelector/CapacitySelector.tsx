import CapacityOption from '@atoms/CapacityOption';
import { skeletonArray } from '@utils/skeletonArray';
import Skeleton from 'react-loading-skeleton';

type CapacitySelectorProps = {
  loading: boolean;
  capacities: string[];
  currentCapacity: string | null;
  onChange: (value: string) => void;
};

const CapacitySelector = ({
  loading,
  capacities,
  currentCapacity,
  onChange,
}: CapacitySelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-secondary">Select capacity</p>
      <div className="flex gap-2">
        {loading ?
          skeletonArray(3).map((_, idx) => (
            <Skeleton
              key={idx}
              width={60}
              height={32}
            />
          ))
        : capacities.map((capacity) => (
            <CapacityOption
              key={capacity}
              value={capacity}
              selected={capacity === currentCapacity}
              onClick={() => onChange(capacity)}
            />
          ))
        }
      </div>
    </div>
  );
};
export default CapacitySelector;
