import './Image.scss';

type ImageProps = {
  src: string;
  alt?: string;
};

const Image = ({ src, alt }: ImageProps) => {
  return (
    <div className="card__img-wrapper">
      <img
        className="card__img"
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default Image;
