import { useState } from 'react';
import './Select.scss';

type SelectProps = {
  value: string;
  items: string[];
  onChange: (value: string) => void;
};

const Select = ({ value, items, onChange }: SelectProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const handleSelect = (item: string) => {
    onChange(item);
    setOpen(false);
  };

  return (
    <div className="select">
      <button
        className={`select__button ${open ? 'open' : ''}`}
        onClick={toggle}
        onBlur={() => setOpen(false)}
      >
        <span className="select__value">{value}</span>
        <span className="select__arrow" />
      </button>

      {open && (
        <ul className="select__dropdown">
          {items.map((item) => (
            <li
              key={item}
              className="select__item"
              onMouseDown={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
