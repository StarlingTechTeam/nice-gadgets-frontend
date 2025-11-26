import ColorDot from '@atoms/ColorDot';
import { getColorHex } from '@utils/getColorHex';
import { skeletonArray } from '@utils/skeletonArray';
import Skeleton from 'react-loading-skeleton';

type ColorSelectorProps = {
  loading: boolean;
  colors: string[];
  currentColor: string | null;
  onChange: (value: string) => void;
};

const ColorSelector = ({
  loading,
  colors,
  currentColor,
  onChange,
}: ColorSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-secondary">Available colors</p>

      <div className="flex gap-2">
        {loading ?
          skeletonArray(4).map((_, idx) => (
            <Skeleton
              key={idx}
              width={30}
              height={30}
              circle
            />
          ))
        : colors.map((color) => {
            const displayColor = getColorHex(color);

            return (
              <ColorDot
                key={color}
                color={displayColor}
                selected={currentColor === color}
                onClick={() => onChange(color)}
              ></ColorDot>
            );
          })
        }
      </div>
    </div>
  );
};
export default ColorSelector;
