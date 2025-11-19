import { useTheme } from '../../../hooks/useTheme';
import Button from '../../atoms/Button';

const Header = () => {
  const { toggleTheme } = useTheme();

  return (
    <div>
      <h1>Header</h1>
      <Button
        variant="primary"
        onClick={() => toggleTheme()}
      >
        Change Theme
      </Button>
    </div>
  );
};
export default Header;
