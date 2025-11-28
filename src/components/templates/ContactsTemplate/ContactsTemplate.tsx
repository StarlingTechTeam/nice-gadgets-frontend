import PageTitle from '@atoms/PageTitle';
import DevelopersGrid from '@organisms/DevelopersGrid';
import type { Developer } from '@/types/Developer';
import './ContactsTemplate.scss';

type ContactsTemplateProps = {
  title: string;
  subtitle?: string;
  developers: Developer[];
};

const ContactsTemplate = ({
  title,
  subtitle,
  developers,
}: ContactsTemplateProps) => {
  return (
    <div className="contacts-template">
      <div className="contacts-header">
        <PageTitle>{title}</PageTitle>
        {subtitle && <p className="contacts-subtitle">{subtitle}</p>}
      </div>

      <DevelopersGrid developers={developers} />
    </div>
  );
};

export default ContactsTemplate;
