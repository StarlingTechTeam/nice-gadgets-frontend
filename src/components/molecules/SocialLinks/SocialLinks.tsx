import { Github, Linkedin, Mail } from 'lucide-react';
import SocialLink from '@molecules/SocialLink';
import './SocialLinks.scss';

type SocialLinksProps = {
  github?: string;
  linkedin?: string;
  email?: string;
};

const SocialLinks = ({ github, linkedin, email }: SocialLinksProps) => {
  return (
    <div className="social-links">
      {github && (
        <SocialLink
          href={github}
          icon={<Github size={20} />}
          label="GitHub Profile"
        />
      )}
      {linkedin && (
        <SocialLink
          href={linkedin}
          icon={<Linkedin size={20} />}
          label="LinkedIn Profile"
        />
      )}
      {email && (
        <SocialLink
          href={`mailto:${email}`}
          icon={<Mail size={20} />}
          label="Email"
        />
      )}
    </div>
  );
};

export default SocialLinks;
