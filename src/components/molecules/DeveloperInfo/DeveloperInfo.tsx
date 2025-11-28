import Title from '@atoms/Text/Title';
import Subtitle from '@atoms/Text/Subtitle';
import './DeveloperInfo.scss';

type DeveloperInfoProps = {
  name: string;
  role: string;
};

const DeveloperInfo = ({ name, role }: DeveloperInfoProps) => {
  return (
    <div className="developer-info">
      <Title productName={name} />
      <Subtitle title={role} />
    </div>
  );
};

export default DeveloperInfo;
