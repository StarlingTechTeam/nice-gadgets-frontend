import Image from '@atoms/Image';
import DeveloperInfo from '@molecules/DeveloperInfo';
import SocialLinks from '@molecules/SocialLinks';
import type { Developer } from '@/types/Developer';
import './DeveloperCard.scss';
import Subtitle from '@atoms/Text/Subtitle';

type DeveloperCardProps = {
  developer: Developer;
};

const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="developer-card">
      <div className="developer-card__image">
        <Image
          src={developer.photo}
          alt={developer.name}
        />
      </div>

      <div className="developer-card__content">
        <DeveloperInfo
          name={developer.name}
          role={developer.role}
        />

        <Subtitle title={developer.description} />

        <SocialLinks
          github={developer.github}
          linkedin={developer.linkedin}
          email={developer.email}
        />
      </div>
    </div>
  );
};

export default DeveloperCard;
