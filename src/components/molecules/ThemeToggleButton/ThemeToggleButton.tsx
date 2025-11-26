import { useTheme } from '@hooks/useTheme';
import './ThemeToggleButton.scss';

const ThemeToggleButton = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <>
      <button
        className="icon-btn"
        aria-label="Toggle theme"
        onClick={() => toggleTheme()}
        title="Toggle theme"
      >
        {theme === 'dark' ?
          <MoonIcon />
        : <SunIcon />}
      </button>
    </>
  );
};

const SunIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <circle
      cx="12"
      cy="12"
      r="4"
      stroke="#0f0f11"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M12 2v2M12 20v2M4.9 4.9L6.3 6.3M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      stroke="#0f0f11"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MoonIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    aria-hidden
  >
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
      stroke="#f1f2f9"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

export default ThemeToggleButton;
