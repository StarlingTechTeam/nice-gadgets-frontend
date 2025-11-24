import Button from '@atoms/Button';
import './BackToTop.scss';

const BackToTop = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className="back-to-top-wrapper"
      onClick={() => handleClick()}
    >
      <span className="back-to-top-text">Back to top</span>
      <div className="back-to-top-button">
        <Button
          variant="icon"
          icon={
            <div className="arrow-up-icon-wrapper">
              <span className="arrow-up-icon"></span>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default BackToTop;
