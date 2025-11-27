import './FilterCheckbox.scss';

type FilterCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  count?: number;
  disabled?: boolean;
};

const FilterCheckbox = ({
  label,
  checked,
  onChange,
  count,
  disabled = false,
}: FilterCheckboxProps) => {
  return (
    <label
      className={`filter-checkbox ${disabled ? 'filter-checkbox--disabled' : ''}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="filter-checkbox__input"
        disabled={disabled}
      />
      <span className="filter-checkbox__checkmark" />
      <span className="filter-checkbox__label">{label}</span>
      {count !== undefined && (
        <span className="filter-checkbox__count">({count})</span>
      )}
    </label>
  );
};

export default FilterCheckbox;
