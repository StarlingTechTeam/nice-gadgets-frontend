import DeveloperCard from '@organisms/DeveloperCard';
import type { Developer } from '@/types/Developer';
import './DevelopersGrid.scss';

type DevelopersGridProps = {
  developers: Developer[];
};

const DevelopersGrid = ({ developers }: DevelopersGridProps) => {
  return (
    <div className="developers-grid">
      {developers.map((developer) => (
        <DeveloperCard
          key={developer.id}
          developer={developer}
        />
      ))}
    </div>
  );
};

export default DevelopersGrid;
