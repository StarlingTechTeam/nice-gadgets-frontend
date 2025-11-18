import { Button } from '../../atoms/Button/Button';
import heartIcon from '../../../assets/icons/heart-icon.svg';

const AddToFavButton = () => {
  return (
    <div>
      <Button
        icon={
          <img
            src={heartIcon}
            alt="Heart Icon"
          />
        }
      />
    </div>
  );
};

export default AddToFavButton;
