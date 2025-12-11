import Icon from '@atoms/Icon/Icon';
import arrowLeftIcon from '@assets/icons/arrow-left.svg';
import './BackButton.scss';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

const BackButton = ({ onClick, className }: BackButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.history.back();
    }
  };

  return (
    <button
      className={`back-button ${className || ''}`}
      onClick={handleClick}
      aria-label="Go back"
      type="button"
    >
      <Icon
        src={arrowLeftIcon}
        size={20}
      />
      <span className="back-button__text">Back</span>
    </button>
  );
};

export default BackButton;
