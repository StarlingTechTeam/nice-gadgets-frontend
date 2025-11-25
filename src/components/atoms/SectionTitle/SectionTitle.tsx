import './SectionTitle.scss';

type SectionTitleProps = {
  text: string;
};

const SectionTitle = ({ text }: SectionTitleProps) => (
  <div className="homepage__section-title__wrapper">
    <h2 className="homepage__section-title">{text}</h2>
  </div>
);

export default SectionTitle;
