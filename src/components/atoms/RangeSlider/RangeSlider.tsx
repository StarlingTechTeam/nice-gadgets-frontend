import { useRef, useEffect, useState, useCallback } from 'react';
import './RangeSlider.scss';

type RangeSliderProps = {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  formatValue?: (value: number) => string;
};

const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatValue = (v) => `$${v}`,
}: RangeSliderProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null);
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const getPercentage = useCallback(
    (val: number) => ((val - min) / (max - min)) * 100,
    [min, max],
  );

  const getValueFromPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return min;
      const rect = sliderRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width),
      );
      const rawValue = min + percentage * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step],
  );

  const handleMouseDown = (type: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(type);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const newValue = getValueFromPosition(e.clientX);
      const newRange: [number, number] = [...localValue] as [number, number];

      if (isDragging === 'min') {
        newRange[0] = Math.max(min, Math.min(newValue, localValue[1] - step));
      } else {
        newRange[1] = Math.min(max, Math.max(newValue, localValue[0] + step));
      }

      setLocalValue(newRange);
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      onChange(localValue);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, localValue, min, max, step, onChange, getValueFromPosition]);

  const minPercentage = getPercentage(localValue[0]);
  const maxPercentage = getPercentage(localValue[1]);

  return (
    <div
      className="range-slider"
      ref={sliderRef}
    >
      <div className="range-slider__track">
        <div
          className="range-slider__active-track"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />
      </div>
      <div
        className="range-slider__thumb range-slider__thumb--min"
        style={{ left: `calc(${minPercentage}% + 1rem)` }}
        onMouseDown={handleMouseDown('min')}
      >
        <span className="range-slider__value">
          {formatValue(localValue[0])}
        </span>
      </div>
      <div
        className="range-slider__thumb range-slider__thumb--max"
        style={{ left: `calc(${maxPercentage}% + 1rem)` }}
        onMouseDown={handleMouseDown('max')}
      >
        <span className="range-slider__value">
          {formatValue(localValue[1])}
        </span>
      </div>
    </div>
  );
};

export default RangeSlider;
