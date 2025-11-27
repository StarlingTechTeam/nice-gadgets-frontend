type ColorDotProps = {
  color: string;
  selected?: boolean;
  filterSelected?: boolean;
  onClick: () => void;
};

const ColorDot = ({
  color,
  selected,
  onClick,
  filterSelected,
}: ColorDotProps) => (
  <button
    className={`border-2 rounded-full cursor-pointer ${selected ? 'border-primary' : 'border-border'} ${filterSelected ? 'border-checked' : 'border-border'}`}
    onClick={onClick}
  >
    <div
      style={{ backgroundColor: color }}
      className="w-[30px] h-[30px] rounded-full border-2 border-background"
    />
  </button>
);

export default ColorDot;
