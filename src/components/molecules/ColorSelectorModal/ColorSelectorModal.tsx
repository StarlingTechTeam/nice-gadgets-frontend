import { useEffect } from 'react';
import classNames from 'classnames';
import ColorDot from '@atoms/ColorDot';
import { getColorHex } from '@utils/getColorHex';
import Button from '@atoms/Button';
import Icon from '@atoms/Icon';
import CloseIcon from '@assets/icons/close-icon.svg';
import './ColorSelectorModal.scss';

type ColorSelectorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  colors: string[];
  selectedColors: string[];
  onColorChange: (color: string, checked: boolean) => void;
  disabledColors?: string[];
};

const ColorSelectorModal = ({
  isOpen,
  onClose,
  colors,
  selectedColors,
  onColorChange,
  disabledColors = [],
}: ColorSelectorModalProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="color-selector-modal__backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={classNames('color-selector-modal', {
          'color-selector-modal--open': isOpen,
        })}
        role="dialog"
        aria-modal="true"
      >
        <div className="color-selector-modal__header">
          <h3 className="color-selector-modal__title">Select Colors</h3>
          <Button
            variant="icon"
            onClick={onClose}
            aria-label="Close color selector"
            icon={<Icon src={CloseIcon} />}
          />
        </div>

        <div className="color-selector-modal__content">
          <div className="color-selector-modal__colors">
            {colors.map((color) => {
              const colorHex = getColorHex(color);
              const isSelected = selectedColors.includes(color);
              const isDisabled = disabledColors.includes(color) && !isSelected;
              return (
                <div
                  key={color}
                  className={`color-selector-modal__color-item ${isDisabled ? 'color-selector-modal__color-item--disabled' : ''}`}
                  onClick={() =>
                    !isDisabled && onColorChange(color, !isSelected)
                  }
                >
                  <ColorDot
                    color={colorHex}
                    selected={isSelected}
                    onClick={() =>
                      !isDisabled && onColorChange(color, !isSelected)
                    }
                  />
                  <span className="color-selector-modal__color-label">
                    {color}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="color-selector-modal__footer">
          <Button
            variant="primary"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
};

export default ColorSelectorModal;
