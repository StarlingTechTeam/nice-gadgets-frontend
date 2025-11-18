import './App.scss';
import { HashRouter as Router } from 'react-router-dom';
import PageWrapper from '../layouts/PageWrapper';
import { ThemeProvider } from '../context/ThemeProvider';
import AppRoutes from './router/AppRoutes';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <PageWrapper>
          <AppRoutes />
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
};

export default App;
