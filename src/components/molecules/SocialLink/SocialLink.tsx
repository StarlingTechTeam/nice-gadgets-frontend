import './SocialLink.scss';

type SocialLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const SocialLink = ({ href, icon, label }: SocialLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-link"
      aria-label={label}
    >
      {icon}
    </a>
  );
};

export default SocialLink;
