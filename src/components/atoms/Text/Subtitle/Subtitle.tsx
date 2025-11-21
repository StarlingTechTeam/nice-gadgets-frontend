import './Subtitle.scss';

type SubtitleProps = {
  title: string;
  tech?: boolean;
};

const Subtitle = ({ title, tech, ...props }: SubtitleProps) => {
  return (
    <span
      className={`text-secondary ${tech ? 'card__subtitle__lg' : 'card__subtitle'}`}
      {...props}
    >
      {title}
    </span>
  );
};

export default Subtitle;
