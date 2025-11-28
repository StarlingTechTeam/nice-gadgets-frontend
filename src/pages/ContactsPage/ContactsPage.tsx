import ContactsTemplate from '@templates/ContactsTemplate';
import type { Developer } from '@/types/Developer';
import developersData from '@/shared/api/data/developers.json';
import './ContactsPage.scss';

const ContactsPage = () => {
  const developers: Developer[] = developersData;

  return (
    <ContactsTemplate
      title="Our team"
      subtitle="Meet the talented developers behind this project"
      developers={developers}
    />
  );
};

export default ContactsPage;
