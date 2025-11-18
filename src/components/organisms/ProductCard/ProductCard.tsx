import Image from '../../atoms/Image/Image';
import Title from '../../atoms/Text/Title/Title';
import Price from '../../atoms/Price/Price';
import Subtitle from '../../atoms/Text/Subtitle/Subtitle';
import Value from '../../atoms/Text/Value/Value';
import Divider from '../../atoms/Divider/Divider';

import AddToCartButton from '../../molecules/AddToCartButton/AddToCartButton';
import AddToFavButton from '../../molecules/AddToFavButton/AddToFavButton';

import './ProductCard.scss';

type ProductCardProps = {
  productName: string;
  price: number;
  fullPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
};

const ProductCard = ({
  productName,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
}: ProductCardProps) => {
  return (
    <div className="card">
      <Image />

      <AddToFavButton />
      {/* <div className="card__content"> */}
      <div className="card__title-wrapper">
        <Title productName={productName} />
      </div>

      <Price
        price={price}
        fullPrice={fullPrice}
      />

      <Divider />

      <div className="card__product-parameters">
        <div className="card__product-screen">
          <Subtitle title="Screen" />
          <Value value={screen} />
        </div>

        <div className="card__product-capacity">
          <Subtitle title="Capacity" />
          <Value value={capacity} />
        </div>

        <div className="card__product-ram">
          <Subtitle title="RAM" />
          <Value value={ram} />
        </div>
      </div>

      <div className="card__add-to-cart-wrapper">
        <AddToCartButton />
      </div>
      {/* </div> */}
    </div>
  );
};

export default ProductCard;
