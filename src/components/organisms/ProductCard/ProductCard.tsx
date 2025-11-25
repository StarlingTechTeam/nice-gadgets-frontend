import Image from '@atoms/Image';
import Title from '@atoms/Text/Title';
import Price from '@atoms/Price';
import Subtitle from '@atoms/Text/Subtitle';
import Value from '@atoms/Text/Value';
import Divider from '@atoms/Divider';
import AddToCartButton from '@molecules/AddToCartButton';
import AddToFavButton from '@molecules/AddToFavButton';
import './ProductCard.scss';
import { Link } from 'react-router-dom';
import type { ProductCard as ProductCardType } from '@/types/ProductCard';

type ProductCardProps = {
  productName: string;
  price: number;
  fullPrice?: number;
  screen: string;
  capacity: string;
  ram: string;
  image: string;
  capacityLabel: string;
  itemId: string;
  categoryType: string;
  productData?: ProductCardType;
};

const ProductCard = ({
  productName,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  image,
  capacityLabel,
  itemId,
  categoryType,
  productData,
}: ProductCardProps) => {
  return (
    <Link to={`/${categoryType}/${itemId}`}>
      <div className="card">
        <Image
          src={image}
          alt={productName}
        />

        <div className="add-to-fav-btn absolute">
          <AddToFavButton product={productData} />
        </div>

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
            <Subtitle title={capacityLabel} />
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
      </div>
    </Link>
  );
};

export default ProductCard;
