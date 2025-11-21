import Button from '@atoms/Button/Button';
import { useState } from 'react';
import './AddToFavButton.scss';

const AddToFavButton = () => {
  const [active, setActive] = useState(false);

  return (
    <div
      className={`fav-button ${active ? 'is-active' : ''}`}
      onClick={() => setActive((prev) => !prev)}
    >
      <Button
        variant="icon"
        icon={
          <div className="heart-icon-wrapper">
            <span className="heart-icon--outline"></span>
            <span className="heart-icon--filled"></span>
          </div>
        }
      />
    </div>
  );
};

export default AddToFavButton;
