import './Subtitle.scss';

type SubtitleProps = {
  title: string;
};

const Subtitle = ({ title, ...props }: SubtitleProps) => {
  return (
    <span
      className="text-secondary card__subtitle"
      {...props}
    >
      {title}
    </span>
  );
};

export default Subtitle;
