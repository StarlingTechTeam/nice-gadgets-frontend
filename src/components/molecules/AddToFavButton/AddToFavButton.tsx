import Button from '@atoms/Button/Button';

const AddToFavButton = () => {
  return (
    <div className="fav-button">
      <Button
        variant="icon"
        icon={<span className="heart-icon" />}
      />
    </div>
  );
};

export default AddToFavButton;
