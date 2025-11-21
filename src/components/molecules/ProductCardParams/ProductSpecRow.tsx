import Subtitle from '@atoms/Text/Subtitle';
import Value from '@atoms/Text/Value';
import './ProductSpecRow.scss';

export type ProductSpecRowProps = {
  specKey: string;
  specValue: string;
  tech?: boolean;
};

const ProductSpecRow = ({ specKey, specValue, tech }: ProductSpecRowProps) => {
  return (
    <div className="flex w-full justify-between">
      <Subtitle
        title={specKey}
        tech={tech}
      />
      <Value
        value={specValue}
        tech={tech}
      />
    </div>
  );
};
export default ProductSpecRow;
